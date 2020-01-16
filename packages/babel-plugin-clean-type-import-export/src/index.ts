import { NodePath, Node } from '@babel/core';
import {
  ImportDeclaration,
  isImportSpecifier,
  ExportNamedDeclaration,
  Comment,
  isExportSpecifier,
} from 'babel-types';

/**
 * 判断指定注释是否为类型注释
 *
 * @param comment 注释
 */
function isTypeComment(comment: Comment) {
  return comment?.value?.toLowerCase().trim() === 'type';
}

/**
 * 是否包含类型注释
 *
 * @param comments 注释
 */
function containsTypeComment(comments?: Comment[] | null | readonly Comment[]) {
  return !!comments?.some(isTypeComment);
}

/**
 * 排除类型注释
 *
 * @param comments 注释
 */
function removeTypeComments(comments?: Comment[]) {
  return comments?.filter((comment) => !isTypeComment(comment));
}

/**
 * 获取上一个节点
 *
 * @param nodePath 节点路径
 */
function getPrevSibling(nodePath: NodePath<Node>) {
  if (nodePath.key === 0) {
    return undefined;
  }

  if (typeof nodePath.key === 'number') {
    return nodePath.getSibling(nodePath.key - 1);
  }

  const siblings = nodePath.getAllPrevSiblings();
  return siblings.length > 0 ? siblings[siblings.length - 1] : undefined;
}

/**
 * 判断指定节点是否是类型导出
 *
 * @param nodePath 节点路径
 */
function isTypeExportSpecifier(nodePath: NodePath<Node>) {
  const { parentPath } = nodePath;
  const { node } = parentPath;
  const prevSibling = getPrevSibling(parentPath);

  return (
    isExportSpecifier(node) &&
    (containsTypeComment(node.leadingComments) ||
      containsTypeComment(prevSibling?.node?.trailingComments))
  );
}

/**
 * 判断指定变量是否被引用
 *
 * @param path 路径
 * @param name 名称
 */
function isUsedOnlyByType(path: NodePath<any>, name: string) {
  const referencePaths = path.scope.getBinding(name)?.referencePaths;
  return (
    referencePaths &&
    referencePaths.length > 0 &&
    referencePaths?.every((item) => isTypeExportSpecifier(item))
  );
}

export default function() {
  return {
    visitor: {
      /**
       * 去掉类型导出。
       * 
       *```
         export { \\* type \\* B };
       * ```
       * @param path 导出语句的路径
       */
      ExportNamedDeclaration(path: NodePath<ExportNamedDeclaration>) {
        try {
          let nextRemoved = false;
          path.node.specifiers = path.node.specifiers.filter((specifier) => {
            const result = !(
              containsTypeComment(specifier.leadingComments) || nextRemoved
            );

            nextRemoved = containsTypeComment(specifier.trailingComments);

            specifier.leadingComments = removeTypeComments(
              specifier.leadingComments,
            );
            specifier.trailingComments = removeTypeComments(
              specifier.trailingComments,
            );

            return result;
          });
        } catch (e) {
          console.error(e);
        }
      },

      /**
       * 去掉无引用或者类型引用导入
       *
       * @param path 导入语法
       */
      ImportDeclaration(path: NodePath<ImportDeclaration>) {
        try {
          path.node.specifiers = path.node.specifiers.filter((specifier) => {
            if (isImportSpecifier(specifier)) {
              return !isUsedOnlyByType(path, specifier.local.name);
            }
            return true;
          });
        } catch (e) {
          console.warn(e);
        }
      },
    },
  };
}