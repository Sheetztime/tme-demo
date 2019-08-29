import React from 'react';
import { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { CONFIGURATION_EDITOR_URL } from '../../constants/Layout';
import * as IconTypes from '../../constants/Icons';

import Btn from '../icons/BtnWithTooltip';

import { deleteEndpoint } from '../../actions/endpoints';
import { TENANT_PATH } from '../../actions/tenants';


const mapDispatchToProps = { deleteEndpoint };

class Endpoint extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = createRef();
    const { tenant, name } = props;
    this.keyPath = `${TENANT_PATH}{${tenant}}/l3vpn/endpoint{${name}}`;
  }

  delete = async (event) => {
    event.stopPropagation();
    const { isOpen, toggle, deleteEndpoint, tenant, name } = this.props;
    await deleteEndpoint(tenant, name);
    if (isOpen) { toggle(); }
  }

  goTo = (event) => {
    event.stopPropagation();
    window.location.assign(CONFIGURATION_EDITOR_URL + this.keyPath);
  }

  render() {
    console.debug('Endpoint Render');
    const { isOpen, toggle, deleteEndpoint,
            name, tenant, ...rest } = this.props;
    return (
      <div className={classNames('accordion accordion--level2', {
          'accordion--closed': !isOpen,
          'accordion--open': isOpen
      })}>
        <div className="accordion__header" onClick={toggle} >
          <span className="sidebar__title-text">{name} ({rest['Device']})</span>
          <div
            className="inline-round-btn inline-round-btn--go-to"
            onClick={this.goTo}
          >
            <Btn
              type={IconTypes.BTN_GOTO}
              tooltip="View Endpoint in Configuration Editor"
            />
          </div>
          <div
            className="inline-round-btn inline-round-btn--delete"
            onClick={this.delete}
          >
            <Btn type={IconTypes.BTN_DELETE} tooltip="Delete Endpoint"/>
          </div>
        </div>
        <div
          ref={this.ref}
          className="accordion__panel"
          style={{ maxHeight: (isOpen && this.ref.current)
            ? `${this.ref.current.scrollHeight}px` : undefined }}
        >
          <div className="field-group">
            {rest && Object.keys(rest).map(key =>
              <div key={key} className="field-group__row">
                <span className="field-group__label">{key}</span>
                <span className="field-group__value">{rest[key]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Endpoint);
