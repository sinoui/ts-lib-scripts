interface ValueType {
  x?: {
    y?: {
      z?: string;
    };
  };
}

const testOptionalChaining = (value?: ValueType) => {
  console.log(value?.x?.y?.z);
};

export default testOptionalChaining;
