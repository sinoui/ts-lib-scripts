# React Hooks 规则 （rules-of-hooks）

Hook 本质就是 JavaScript 函数，但是在使用它时需要遵循两条规则：

### 只在最顶层使用 Hook

**不要在循环、条件或嵌套函数中调用 Hook**，确保总是在你的 React 函数的最顶层以及任何 return 之前调用它们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 `useState` 和 `useEffect` 调用之间保持 hook 状态的正确。

### 只在 React 函数中调用 Hook

**不要在普通的 JavaScript 函数中调用 Hook**。你可以在：

- ✅ 在 React 的函数组件中调用 Hook
- ✅ 在自定义 Hook 中调用其他 Hook

遵循此规则，确保组件的状态逻辑在代码中清晰可见。

## 参考资料

- [React Hooks 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)
