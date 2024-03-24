/**
 * @description: 将 obj2 中已有的属性值赋值给 obj1 中对应的属性，不添加新属性
 * @param {object} obj1 目标对象
 * @param {object} obj2 源对象
 * @return {*} 更新后的目标对象
 */
export function copyExistingPropertiesInHelpful<T, U>(obj1: T, obj2: U): T {
  Object.keys(obj1).forEach((key) => {
    if (obj2.hasOwnProperty(key)) {
      obj1[key] = obj2[key] as T[keyof T];
    }
  });

  return obj1;
}
