# 检查 effect 的依赖 （react-hooks/exhaustive-deps）

如果使用 `useEffect` 时，指定的依赖不正确，此规则会给出警告。

**错误** 代码示例：

```javacript
function Demo({ title }) {
  useEffect(() => {
    console.log(title);
  }, []); // 🔴
}
```

**正确** 代码示例：

```javascript
function Demo({ title }) {
  useEffect(() => {
    console.log(title);
  }, [title]); // ✅
}
```
