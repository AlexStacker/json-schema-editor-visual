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
  const { prefix, name, root, isAddFiledDisabled } = props;
  const Model = context.Model.schema;
  const menu = (
    root ?
      <Menu>
        <Menu.Item disabled={isAddFiledDisabled}
          onClick={() => {
            Model.setOpenValueAction({ key: ['properties'], value: true });
            Model.addChildFieldAction({ key: ['properties'] });
          }}
        >
          <span
          >
            {LocaleProvider('add_child_node')}
          </span>
        </Menu.Item>
        <Menu.Item onClick={() => Model.addComplexFieldAction({ prefix, name })}>
          <span>
            {LocaleProvider('add_complex_node')}
          </span>
        </Menu.Item>
      </Menu>
      :
      <Menu>
        <Menu.Item onClick={() => Model.addFieldAction({ prefix, name })}>
          <span>
            {LocaleProvider('sibling_node')}
          </span>
        </Menu.Item>
        <Menu.Item onClick={() => {
          Model.setOpenValueAction({ key: [].concat(prefix, name, 'properties'), value: true });
          Model.addChildFieldAction({ key: [].concat(prefix, name, 'properties') });
        }}
        >
          <span>
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