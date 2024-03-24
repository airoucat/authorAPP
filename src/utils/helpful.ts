import type { DataNode } from 'antd/es/tree';
import { type BookVolumeChapterTree } from '@/system/interface/book.interface';

/**
 * @description: 获取当前rem
 * @param {*}
 * @return {*} number 返回rem像素数
 */
export const getDocumentRem = (): number => {
  const rootElement = document.documentElement;
  const computedStyle = window.getComputedStyle(rootElement);
  const fontSize = computedStyle.getPropertyValue('font-size');
  const fontSizeNum = parseFloat(fontSize);
  return fontSizeNum;
};

/**
 * @description: 用于查找Tree中，根据dataNode查找dataNodes中对应旧node，并完成替换
 * @param dataNode 新替换数组元素
 * @param dataNodes 被替换数组
 * @returns 新数组
 */
export function replaceDataNode(dataNode: DataNode, dataNodes: DataNode[]): DataNode[] {
  const newDataNodes = [...dataNodes];
  const index = newDataNodes.findIndex((node) => node.key === dataNode.key);
  if (index !== -1) {
    newDataNodes[index] = dataNode;
  } else {
    for (let i = 0; i < newDataNodes.length; i++) {
      if (newDataNodes[i].children) {
        newDataNodes[i].children = replaceDataNode(
          dataNode,
          newDataNodes[i].children as DataNode[]
        );
      }
    }
  }
  return newDataNodes;
}

/**
 * @description: 用于查找Tree中，根据给定key查找dataNodes中对应node并返回
 * @param key 所需node的key
 * @param dataNodes 数组
 * @returns 检索结果
 */
export function findeDataNode(key: React.Key, dataNodes: DataNode[]): DataNode | null {
  const newDataNodes = [...dataNodes];
  const index = newDataNodes.findIndex((node) => node.key === key);
  if (index !== -1) {
    return newDataNodes[index];
  } else {
    for (let i = 0; i < newDataNodes.length; i++) {
      if (newDataNodes[i].children) {
        const temp = findeDataNode(key, newDataNodes[i].children as DataNode[]);
        if (temp !== null) return temp;
        else continue;
      }
    }
  }
  return null;
}

/**
 * @description: 用于查找书籍卷章节树中对应id的数据并进行替换
 * @param key
 * @param dataNodes
 * @returns
 */
export function replaceBookVolumeChapterTree(
  key: React.Key,
  title: string,
  dataNodes: BookVolumeChapterTree
): BookVolumeChapterTree {
  const newDataNodes = { ...dataNodes };
  if (newDataNodes.volumes && newDataNodes.volumes.length > 0) {
    const index = newDataNodes.volumes.findIndex((node) => node.volumeID === key);
    if (index !== -1) {
      newDataNodes.volumes[index].volumeName = title;
    } else {
      newDataNodes.volumes.forEach((vol, index) => {
        if (vol.chapters && vol.chapters.length > 0) {
          const i = vol.chapters.findIndex((cha) => cha.chapterID === key);
          if (i !== -1 && newDataNodes.volumes && newDataNodes.volumes.length > index) {
            vol.chapters[i].chapterName = title;
            newDataNodes.volumes[index] = vol;
          }
        }
      });
    }
  }
  return newDataNodes;
}
