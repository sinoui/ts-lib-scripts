import { NodePath } from '@babel/core';
import { ExportNamedDeclaration, Comment } from 'babel-types';

function isTypeComment(comment: Comment) {
  return comment?.value?.toLowerCase().trim() === 'type';
}

function containsTypeComment(comments?: Comment[]) {
  return !!comments?.some(isTypeComment);
}

export default function() {
  return {
    visitor: {
      ExportNamedDeclaration(path: NodePath<ExportNamedDeclaration>) {
        let nextRemoved = false;
        path.node.specifiers = path.node.specifiers.filter((specifier) => {
          const result = !(
            containsTypeComment(specifier.leadingComments) || nextRemoved
          );

          nextRemoved = containsTypeComment(specifier.trailingComments);
          return result;
        });
      },
    },
  };
}
