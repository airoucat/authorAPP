import React, { type FC, useEffect, useState, useRef, type ReactElement } from 'react';
import { Layout, Menu, Input } from 'antd';
import type { MenuProps, InputRef } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { usePutFetch, useGetFetch } from '@/utils/fetch';
import {
  type BookVolumeChapterTree,
  type VolumeTree,
  type ChapterTree,
} from '@/system/interface/book.interface';
import { replaceBookVolumeChapterTree, replaceDataNode } from '@/utils/helpful';

import { API_GET_BOOK_DATATREE } from '@/utils/constants';

import DocumentTree from '@/content/components/DocumentTree';

import styles from './index.module.scss';

import books from './book.json';

const book2 = [];

const { Header, Content, Footer } = Layout;

interface TreeRenameNode {
  key: React.Key;
  title: string;
  renameed: boolean;
}

const treeRenameDefault = {
  key: '',
  title: '',
  renameed: false,
};

const EditPage: FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const bookId = params.get('bookID');
  const location = useLocation();
  const [newBookInfo, setNewBookInfo] = useState({
    bookname: '',
  });
  // const book: BookVolumeChapterTree = books[0];
  const [book, setBook] = useState<BookVolumeChapterTree | Record<string, never>>({});
  const [newVol, setNewVol] = useState<number>();
  const [bookDataTree, setBookDataTree] = useState<DataNode[]>([]);
  const [selectedTreeKeys, setSelectedTreeKeys] = useState<React.Key[]>([]);
  const [doubleSelectedTreeKey, setDoubleSelectedTreeKeys] = useState<React.Key | undefined>(
    undefined
  );
  const [treeRenameNode, setTreeRename] = useState<TreeRenameNode>(treeRenameDefault);

  useEffect(() => {
    console.log(location);
    console.log(bookId);
    if (bookId) {
      useGetFetch(API_GET_BOOK_DATATREE.replace(':id', bookId))
        .then((res) => {
          if (res.error) throw res;
          setBook(res.data);
          const newTree = handleConvertTree(book);
          setBookDataTree(newTree);
        })
        .catch((err) => {
          console.log(err);
          navigate('/home');
          throw err;
        });
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent): void => {
    const input = document.querySelector('.ant-input');
    if (input && !input.contains(e.target as Node)) {
      handleTreeRenameOnBlur();
    }
  };

  useEffect(() => {
    console.log('selectedTreeKeys', selectedTreeKeys);
    console.log(book);
    const newTree = handleConvertTree(book);
    setNewVol(undefined);
    setBookDataTree(newTree);
  }, [selectedTreeKeys]); // ###! 这种写法对性能友好吗，或许后面要换一种写法

  useEffect(() => {
    console.log('selectedTreeKeys', selectedTreeKeys);
    console.log(book);
    const newTree = handleConvertTree(book);
    setBookDataTree(newTree);
  }, [book]); // ###! 这种写法对性能友好吗，或许后面要换一种写法

  useEffect(() => {
    console.log(doubleSelectedTreeKey);
    if (Object.keys(book).length !== 0 && !doubleSelectedTreeKey && treeRenameNode.renameed) {
      const newTree = replaceBookVolumeChapterTree(
        treeRenameNode.key,
        treeRenameNode.title,
        book as BookVolumeChapterTree
      );
      setBookDataTree(handleConvertTree(newTree));
      setTreeRename(treeRenameDefault);
      setNewVol(undefined);
    }
    const newTree = handleConvertTree(book);
    setBookDataTree(newTree);
  }, [doubleSelectedTreeKey]);

  useEffect(() => {
    if (newVol !== undefined) {
      setSelectedTreeKeys([`new${newVol}`]);
      setDoubleSelectedTreeKeys(`new${newVol}`);
    }
    if (doubleSelectedTreeKey) {
      console.log(doubleSelectedTreeKey);
      document.getElementById(doubleSelectedTreeKey.toString())?.focus();
    }
  }, [bookDataTree]);

  const isSelectedKey = (key: React.Key): boolean => {
    return !!selectedTreeKeys.includes(key);
    /**
     * ###?
     * 此处不可用key in selectedTreeKeys或者selectedTreeKeys.indexOf(key)，因为React.Key特殊
     * 是由React自己管理生成的，并不是一个单纯的字符串类型，而这两种方法原理就是用===来判断，可能会得到错误的结果
     */
  };

  const isDoubleSelectedKey = (key: React.Key): boolean => {
    return !!doubleSelectedTreeKey && doubleSelectedTreeKey.toString() === key.toString();
  };

  const setTreeTitleContent = (
    id: React.Key,
    index: string | number,
    name: string
  ): ReactElement => {
    if (isDoubleSelectedKey(id)) {
      return (
        <Input
          id={id.toString()}
          defaultValue={name}
          // onChange={handleTreeOnRename}
          // value={name}
          onBlur={(event) => {
            handleTreeRenameOnBlur(event);
          }}
          onChange={(event) => {
            handleTreeRenameOnChange(event);
          }}
          onPressEnter={(event) => {
            handleTreeRenameOnPressEnter(event);
          }}
        />
      );
    } else
      return (
        <>
          <div id={id.toString()} />
          {name}
        </>
      );
  };

  const handleTreeRenameOnBlur = (event?: React.FocusEvent<HTMLInputElement>): void => {
    setDoubleSelectedTreeKeys(undefined);
  };

  const handleTreeRenameOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const node = { ...treeRenameNode };
    node.title = event.target.value;
    if (doubleSelectedTreeKey) {
      node.key = doubleSelectedTreeKey;
      node.renameed = true;
    }
    setTreeRename(node);
  };

  const handleTreeRenameOnPressEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    setDoubleSelectedTreeKeys(undefined);
  };

  const handleConvertTree = (
    bookData: BookVolumeChapterTree | Record<string, never>
  ): DataNode[] => {
    const convertVolumeChapter = (item: VolumeTree[] | ChapterTree[] | undefined): DataNode[] => {
      if (!item || item.length === 0) {
        return [];
      } else {
        const convertData: DataNode[] = [];
        item.forEach((i) => {
          if ('volumeName' in i) {
            convertData.push({
              title: setTreeTitleContent(i.volumeID, i.volumeIndex, i.volumeName),
              className: isSelectedKey(i.volumeID) ? styles.divOnSelected : '',
              key: i.volumeID,
              children: convertVolumeChapter(i.chapters),
            });
          } else {
            convertData.push({
              title: setTreeTitleContent(i.chapterID, i.chapterIndex, i.chapterName),
              className: isSelectedKey(i.chapterID) ? styles.divOnSelected : '',
              key: i.chapterID,
            });
          }
        });
        return convertData;
      }
    };

    /* bookData.forEach((book) => {
      const temp = {
        title: (
          <>
            <div id={book.bookID} />
            {book.bookName}
          </>
        ),
        className: isSelectedKey(book.bookID) ? styles.divOnSelected : '',
        key: book.bookID,
        children: convertVolumeChapter(book.volumes),
      };
      data.push(temp);
    });
     */
    return convertVolumeChapter(bookData.volumes);
  };

  const handleLeftOnSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    if (info.selected && !doubleSelectedTreeKey) setSelectedTreeKeys(selectedKeys);
  };

  const handleMenuItemOnselect = (index: string): void => {
    console.log(index);

    switch (index) {
      case 'createVolume':
        createNewVol();
        break;
      default:
        break;
    }
  };

  const handleOnDoubleClick = (e: React.MouseEvent<HTMLElement>): void => {
    const tempDom = e.target as Element;
    const doubleClickItem = {
      id: tempDom?.children[0]?.id,
      title: tempDom?.textContent,
    };
    if (doubleClickItem.id && doubleSelectedTreeKey !== doubleClickItem.id)
      setDoubleSelectedTreeKeys(doubleClickItem.id);
  };

  const handleTreeOnRename = (v) => {
    console.log(v);
  };

  const createNewVol = (): void => {
    const newBoook = { ...book };
    let newVolIndex: number = 0;
    if (newBoook.volumes && newBoook.volumes.length > 0) {
      newVolIndex = newBoook.volumes.length; // ###! index部分涉及章节排序，后期需要完善
    }
    const volTemp: VolumeTree = {
      volumeID: `new${newVolIndex}`,
      volumeIndex: newVolIndex,
      volumeName: '',
    };

    newBoook.volumes?.push(volTemp);
    setNewVol(newVolIndex);
    setBook(newBoook);

    // navigate(-1);
  };

  const items: MenuProps['items'] = [
    {
      label: '在当前书创建卷',
      key: 'createVolume',
    },
    {
      label: '在当前卷创建章',
      key: 'createChapter',
    },
  ];

  return (
    <Layout className={styles.wrapper}>
      <Header className={styles.antLayoutHeader}>
        <Menu
          theme='light'
          mode='horizontal'
          onClick={(item) => {
            handleMenuItemOnselect(item.key);
          }}
          items={items}
        />
      </Header>
      <Content className={styles.antContentWrapper}>
        <div className={`site-layout-content ${styles.contentWrapper}`}>
          <div className={styles.leftWrapper}>
            <div>{newBookInfo.bookname}</div>
            <DocumentTree
              dataTree={bookDataTree}
              onSelect={handleLeftOnSelect}
              selectedKeys={selectedTreeKeys}
              onDoubleClick={handleOnDoubleClick}
            />
          </div>
          <div className={styles.midWrapper}>mid</div>
          <div className={styles.rightWrapper}>right</div>
        </div>
      </Content>
    </Layout>
  );
};

export default EditPage;
/**
 * ###! 此处React.Key相关处理得不好，需要再修改，然后编辑页面左中右需要拆分
 */
