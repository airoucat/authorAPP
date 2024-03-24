import React, { useState, useEffect } from 'react';
import { ReactComponent as AddIcon } from '@/assets/svg/add.svg';
import { type BookProgramInfo } from '@/system/interface/book.interface';
import { getDocumentRem } from '@/utils/helpful';
import styles from './index.module.scss';

interface Props {
  book?: BookProgramInfo;
  domIndex?: number;
  onClick: (bookID?: string) => void;
}

const BookBaseInfo: React.FC<Props> = ({ book, domIndex = -1, onClick }) => {
  const [wrapperWidth, setWidth] = useState(-1);
  const [displayLabelNum, setLabelNum] = useState(-1); // 渲染标签个数，默认状态渲染所有lable
  const [labelsWidth, setLabelsWidth] = useState<number[]>([]);

  const clientRem = getDocumentRem();

  const setLabelFieldWidth = (): void => {
    const bookDoms = document.getElementsByClassName(styles.book);
    if (bookDoms.length > 0) {
      const bookDom = bookDoms[0];
      const labelFieldWidth = bookDom.children[1].clientWidth;
      if (labelFieldWidth !== wrapperWidth) setWidth(labelFieldWidth);
    }
  };

  const setLabelTagWidth = (): void => {
    const bookDoms = document.getElementsByClassName(styles.book);
    if (bookDoms.length > 0 && domIndex !== -1 && book) {
      const labelMarginLength = clientRem * 0.3;
      const bookDom = bookDoms[domIndex];
      const labels = bookDom.children[1].children;
      const widthArry = [];
      for (let i = 0; i < book.category.length; i++) {
        widthArry.push(labels[i].clientWidth + labelMarginLength + 2); // 组件内容宽+css marginRight+ css边框宽
      }
      setLabelsWidth(widthArry);
    }
  };

  const handleOnClick = (): void => {
    if (book) onClick(book._id);
    else onClick();
  };

  useEffect(() => {
    setLabelTagWidth();
    setLabelFieldWidth();
  }, []); // 调整标签显示

  useEffect(() => {
    let labelsWidthSum = 0;
    for (let i = 0; i < labelsWidth.length; i++) {
      labelsWidthSum += labelsWidth[i];
      if (labelsWidthSum > wrapperWidth || labelsWidthSum + 13 > wrapperWidth) {
        setLabelNum(i);
        break;
      }
      if (i === labelsWidth.length - 1 && labelsWidthSum <= wrapperWidth) {
        setLabelNum(i + 1);
      }
    }
  }, [wrapperWidth]);

  let resizeTimeoutId: number;
  window.addEventListener('resize', () => {
    if (resizeTimeoutId) {
      window.cancelAnimationFrame(resizeTimeoutId);
    }
    resizeTimeoutId = window.requestAnimationFrame(() => {
      setLabelFieldWidth();
    });
  });

  let content: React.ReactElement | null = null;
  if (!book) {
    content = (
      <>
        <AddIcon className={styles.addIcon} />
      </>
    );
  } else {
    let labels: React.ReactElement | null = null;
    if (displayLabelNum === -1 || displayLabelNum === book.category.length) {
      labels = (
        <>
          {book.category.map((item, index) => {
            return <label key={index}>{item}</label>;
          })}
        </>
      );
    } else if (displayLabelNum === 0) {
      labels = <div>...</div>;
    } else if (displayLabelNum > 0 && displayLabelNum < book.category.length) {
      labels = (
        <>
          {book.category.map((item, index) => {
            if (index < displayLabelNum) return <label key={index}>{item}</label>;
            else return null;
          })}
          <div>...</div>
        </>
      );
    }
    content = (
      <div className={styles.book}>
        <div>{book.title}</div>
        <div>{labels}</div>
        <div>{book.updatedAt.toString()}</div>
      </div>
    );
  }

  return (
    <div className={styles.bookInfoBoder} onClick={handleOnClick}>
      {content}
    </div>
  );
};

export default BookBaseInfo;
