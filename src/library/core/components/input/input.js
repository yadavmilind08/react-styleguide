import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from '@progress/kendo-react-inputs';
import { useDebounce } from '@util/debounce';
import { EventKeys } from '@util/event-keys';
import './input.scss';

export const input = ({
    id,
    type,
    name,
    value,
    setValue,
    maxLength,
    className,
    size,
    placeholder,
    onChange,
    onTextChange,
    onDebouncedValueChange,
    onFocus,
    onBlur,
    onKeyUp,
    onKeyDown,
    disabled,
    preEndIcon,
    onPreEndIconClick,
    endIcon,
    onEndIconClick,
    tabIndex,
    alwaysVisiblePlaceholder,
    lock,
    autoFocus,
    onRef,
    register
}) => {
    placeholder = placeholder || 'Enter text';
    const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);
    const control = useRef();
    const isFirstRun = useRef(true);
    const debouncedValue = useDebounce(value, 300);

    const handleFocus = event => {
        if (!alwaysVisiblePlaceholder) {
            setVisiblePlaceholder(false);
        }
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleBlur = event => {
        setVisiblePlaceholder(true);
        if (onBlur) {
            onBlur(event);
        }
    };

    const handleKeydown = event => {
        if (lock && !EventKeys.isTab(event)) {
            event.preventDefault();
            return;
        }
        if (EventKeys.isDelete(event)) {
            if (setValue) {
                setValue('');
            }
        }
        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (onDebouncedValueChange) {
            onDebouncedValueChange(debouncedValue);
        }
    }, [debouncedValue]);

    useEffect(() => {
        if (autoFocus) {
            control.current.focus();
        }
        if (onRef) {
            onRef(control);
        }
    }, [autoFocus]);

    return (
        <div
            className={classNames(
                !value ? 'no-value' : '',
                'text-box',
                endIcon ? 'ellipsis' : '',
                className,
            )}
        >
            <Input
                ref={control}
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={visiblePlaceholder ? placeholder : null}
                maxLength={maxLength}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeydown}
                onKeyUp={onKeyUp}
                disabled={disabled}
                className={classNames(size ? size : '')}
                autoComplete="off"
                type="text"
                tabIndex={tabIndex}
                autoFocus={autoFocus}
            />
            {preEndIcon ? (
                <span
                    className="input-icon end pre"
                    onClick={onPreEndIconClick}
                >
                    {preEndIcon}
                </span>
            ) : null}
            {endIcon ? (
                <span className="input-icon end post" onClick={onEndIconClick}>
                    {endIcon}
                </span>
            ) : null}
        </div>
    );
};

input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    maxLength: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
};
