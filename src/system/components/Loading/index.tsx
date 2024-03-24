import { Spin } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.scss';

interface Props {
  loading: boolean
  size?: 'small' | 'default' | 'large' // 文本加载|卡片容器级加载|页面级加载
}

const Loading: React.FC<Props> = ({ loading, size = 'default', ...props }) => {
  return (
    <div className={loading ? styles.loading : ''}>
      <Spin spinning={loading} size={size} />
    </div>
  );
};

export default Loading;

/**
 * ###?
 * 这里的...props代表 除开写明的以外的属性全部展开到一个新对象props里,没有对其它属性或者方法比如这里隐式的children的需要可以省掉它，
 * 这种写法就是
 * ... = (props:Props) => {
 *  const {...} = props
 * }
 * 的简写,
 * 另外需得注意这里loading与size已不包含于props中
 */
