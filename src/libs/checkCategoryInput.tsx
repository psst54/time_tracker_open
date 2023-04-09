import type { CategoryType } from "@/types";

const hasEmptyField = (inputData: CategoryType) => {
  return !(inputData.title && inputData.emoji && inputData.color);
};

const isColorValid = (colorString: string) => {
  const reg = /^#([0-9a-f]{3}){1,2}$/i;
  return reg.test(colorString);
};

export { hasEmptyField, isColorValid };
