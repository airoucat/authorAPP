import React, { useState, useEffect, ReactNode } from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { DownOutlined } from '@ant-design/icons';

import { ReactComponent as DropDown } from '@/assets/svg/dropDown.svg';
import styles from './index.module.scss';

const { TreeNode } = Tree;

interface Props extends TreeProps {
  dataTree: DataNode[] | undefined;
  onSelect: TreeProps['onSelect'];
}

const DocumentTree: React.FC<Props> = ({ dataTree, onSelect, ...props }) => {
  const handleOnSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    if (onSelect) onSelect(selectedKeys, info);
  };

  return (
    <Tree
      showLine
      blockNode
      rootClassName={styles.treeClass}
      switcherIcon={<DropDown className={styles.dropDown} />}
      treeData={dataTree}
      onSelect={handleOnSelect}
      {...props}
    />
  );
};
export default DocumentTree;
/**
 *
 *
 *
 */
