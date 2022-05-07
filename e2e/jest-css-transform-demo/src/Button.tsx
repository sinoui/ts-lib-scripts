import './Button.css';

/**
 * 按钮组件属性
 */
interface ButtonProps {
  /**
   * 按钮中包含的元素
   */
  children?: React.ReactNode;
}

/**
 * 用于测试的按钮组件
 *
 * @param props 属性
 * @param props.children 子元素
 */
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <div className="button" {...rest}>
    {children}
  </div>
);

export default Button;
