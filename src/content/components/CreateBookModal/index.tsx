import React, { useState, useEffect } from 'react';
import { Modal, Button, Col, Form, Input } from 'antd';
import { type NewBookInfo } from '@/system/interface/book.interface';
import styles from './index.module.scss';

interface Props {
  open: boolean;
  onOk: (v: NewBookInfo) => void;
  onCancel: () => void;
}

const { Item } = Form;

const CreateBookModal: React.FC<Props> = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal open={open} onCancel={onCancel} footer={null} title={'新建书籍'}>
      <Form form={form} onFinish={onOk}>
        <Item label='书名' name='bookname' rules={[{ required: true, message: '请输入书名' }]}>
          <Input placeholder='请输入书名' />
        </Item>
        {/* <Item
          label="标签"
          name="labels"
          rules={[{ required: false, message: '请选择标签' }]}
        >
          <Input placeholder="请输入标签" />
        </Item> */}
        <Item>
          <div className={styles.buttonWrapper}>
            <Button type='primary' htmlType='submit'>
              创建
            </Button>
            <Button htmlType='button' onClick={onCancel}>
              取消
            </Button>
          </div>
        </Item>
      </Form>
    </Modal>
  );
};
export default CreateBookModal;
