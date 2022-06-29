import React from "react";
import { Cell, Input, Button, Toast } from 'zarm';
import { createForm } from "rc-form";
import Header from "@/components/Header";
import md5 from "md5";
import { post } from '@/utils';

import s from './style.module.less'

const Account = (props) => {
  const { getFieldProps, getFieldError } = props.form;

  const submit = () => {
    props.form.validateFields(async (error, value) => {
      if (!error) {
        console.log(value)
        if (value.newpass != value.newpass2) {
          Toast.show('新密码输入不一致');
          return
        }
        const oldpassMd5 = md5(value.oldpass);
        const newpassMd5 = md5(value.newpass);
        const newpass2Md5 = md5(value.newpass2);
        await post('/api/user/modify_pass', {
          old_pass: oldpassMd5,
          new_pass: newpassMd5,
          new_pass2: newpass2Md5,
        })
        Toast.show('修改成功')
      }
    })
  }
  return <>
    <Header title="重置密码" />
    <div className={s.account}>
      <div className={s.form}>
        <Cell title="原密码">
          <Input
            clearable
            type="text"
            placeholder="请输入原密码"
            {...getFieldProps('oldpass', { rules: [{ required: true }] })}
          />
        </Cell>
        <Cell title="新密码">
          <Input
            clearable
            type="text"
            placeholder="请输入新密码"
            {...getFieldProps('newpass', { rules: [{ required: true }] })}
          />
        </Cell>
        <Cell title="确认密码">
          <Input
            clearable
            type="text"
            placeholder="请输入新密码确认"
            {...getFieldProps('newpass2', { rules: [{ required: true }] })}
          />
        </Cell>
      </div>
      <Button className={s.btn} block theme="primary" onClick={submit}>提交</Button>
    </div>
  </>
};

export default createForm()(Account);

