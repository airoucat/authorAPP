import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { type BookProgramInfo, type NewBookInfo } from '@/system/interface/book.interface';
import { usePutFetch, useGetFetch } from '@/utils/fetch';
import { API_PUT_BOOK_CREATE, API_GET_BOOK_PROGRAM } from '@/utils/constants';
import BookBaseInfo from '../../components/BookBaseInfo';
import CreateBookModal from '../../components/CreateBookModal';
import Loading from '@/system/components/Loading';
import styles from './index.module.scss';
import { resolve } from 'path';

const Home: React.FC = () => {
  const [bookProgram, setBookProgram] = useState<BookProgramInfo[]>([]);
  const [createBookVisible, setCreateBook] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    handleGetBookList();
  }, []);

  const handleGetBookList = (): void => {
    setTimeout(() => {
      useGetFetch(API_GET_BOOK_PROGRAM)
        .then((res) => {
          if (res.error) throw res;
          setBookProgram(res.list); // ###! 存放到redux
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  const handleBookBaseInfoOnClick = (bookID?: string): void => {
    if (bookID) {
      navigate(`/edit?bookID=${bookID}`);
    } else {
      setCreateBook(true);
    }
  };

  const handleCreateOnOk = (v: NewBookInfo): void => {
    setLoading(true);
    // ###! 这里v需要确定类型，等此部分内容稳定再改
    setTimeout(() => {
      usePutFetch(API_PUT_BOOK_CREATE, v)
        .then((res) => {
          if (res.error) throw res;
          handleGetBookList();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err); // ###! error弹窗
          throw err;
        })
        .finally(() => {
          setCreateBook(false);
        });
    }, 500);
    // navigate(`/edit?bookID`, { state: { newBookInfo: v } });
  };

  const handleCreateOnCancel = (): void => {
    setCreateBook(false);
  };

  return (
    <>
      <Loading loading={loading} size='large' />
      <div className={styles.itemsWrapper}>
        <Row justify='center'>
          <Col span={20}>
            <BookBaseInfo onClick={handleBookBaseInfoOnClick} />
          </Col>
        </Row>
        {bookProgram.map((book, index) => {
          return (
            <Row justify='center' key={book.id}>
              <Col span={20} className={styles.booksItem}>
                <BookBaseInfo book={book} domIndex={index} onClick={handleBookBaseInfoOnClick} />
              </Col>
            </Row>
          );
        })}
        <CreateBookModal
          open={createBookVisible}
          onOk={handleCreateOnOk}
          onCancel={handleCreateOnCancel}
        />
      </div>
    </>
  );
};

export default Home;

// ###! 此页面每当修改代码保存后浏览器都会报错，需要调查解决
