import React from 'react';
import {
  Dropdown,
  Menu,
  Icon,
  Tooltip
} from 'antd';
import PropTypes from 'prop-types';
import LocaleProvider from '../LocalProvider/index.js';

const DropPlus = (props, context) => {
  const { prefix, name, root, isAddRootFiled } = props;
  const Model = context.Model.schema;
  const menu = (
    root ? 
    <Menu>
      {isAddRootFiled ? <Menu.Item>
        <span
          onClick={() => {
            Model.setOpenValueAction({ key: ['properties'], value: true });
            Model.addChildFieldAction({ key: ['properties'] });
            return false;
          }}
        >
          {LocaleProvider('add_child_node')}
        </span>
      </Menu.Item> : null }
      <Menu.Item>
        <span onClick={() => Model.addComplexFieldAction({ prefix, name })}>
          {LocaleProvider('add_scene_node')}
        </span>
      </Menu.Item>
    </Menu>
    :
    <Menu>
      <Menu.Item>
        <span onClick={() => Model.addFieldAction({ prefix, name })}>
          {LocaleProvider('sibling_node')}
        </span>
      </Menu.Item>
      <Menu.Item>
        <span
          onClick={() => {
            Model.setOpenValueAction({ key: [].concat(prefix, name, 'properties'), value: true });
            Model.addChildFieldAction({ key: [].concat(prefix, name, 'properties') });
            return false;
          }}
        >
          {LocaleProvider('child_node')}
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Tooltip placement="top" title={LocaleProvider('add_node')}>
      <Dropdown overlay={menu}>
        <Icon type="plus" className="plus" />
      </Dropdown>
    </Tooltip>
  );
};

DropPlus.contextTypes = {
  Model: PropTypes.object
};

export default DropPlus;