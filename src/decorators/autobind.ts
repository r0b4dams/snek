export const autobind = (
  _proto: object,
  _key: string,
  desc: PropertyDescriptor
) => {
  if (!desc || typeof desc.value !== "function") {
    throw new Error("autobind decorator expects a method instance member");
  }
  return {
    get() {
      return desc.value.bind(this);
    },
  } as PropertyDescriptor;
};
