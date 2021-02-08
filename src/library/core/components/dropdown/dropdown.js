import React, { useState, useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  CaretDownOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Portal } from "@core/portal";
import { Input } from "@core/input";
import { Label } from "@core/label";
import { EventKeys } from "@util/event-keys";
import { useDebounce } from "@util/debounce";
import { filterBySearchText } from "@library/utils/data-filter";
import { DropdownType } from "./dropdown.model";
import "./dropdown.scss";

const dropdown = ({
  type = DropdownType.Dropdown,
  name,
  value,
  data,
  textField,
  valueField,
  dataItemKey,
  onFocus,
  onChange,
  onBlur,
  onTextChange,
  onKeyDownChange,
  onOpen,
  onClose,
  onDebouncedValueChange,
  loading,
  itemRender,
  placeholder,
  preEndIcon,
  onPreEndIconClick,
  endIcon,
  onEndIconClick,
  allowCustom = false,
  disabled,
  filterable = true,
  filterColumns,
  filterCaseSensitivity = false,
  minFilterLength = 0,
  visibleFilterInput,
  className,
  pageSize = 20,
  onShowMoreItems,
  visibleDropdownItems = 5,
  tabIndex,
  visibleDropdown,
  visibleNoData = true,
  noDataText = "No data found",
  lock = false,
  autoFocus,
  ...props
}) => {
  data = data || [];
  const scrollBar = useRef();
  const input = useRef();
  const [inputRef, setInputRef] = useState(null);
  const isFirstRun = useRef(true);
  const [openTop, setOpenTop] = useState(false);
  const [itemRefs, setItemRefs] = useState([]);
  const [displayValue, setDisplayValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [inputValue, setInputValue] = useState();
  const [selectableItem, setSelectableItem] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [visibleShowMoreItems, setVisibleShowMoreItems] = useState(false);
  const [skip, setSkip] = useState(0);
  const [visibleDropdownContainer, setVisibleDropdownContainer] = useState(
    false
  );
  const [containerStyle, setContainerStyle] = useState({});
  const debouncedValue = useDebounce(displayValue);

  const handleInputChange = (event) => {
    setDisplayValue(event.target.value);
    handleChange(event);
  };

  const handleFilterInputChange = (event) => {
    setFilterValue(event.target.value);
    handleChange(event);
  };

  const handleChange = (event) => {
    openDropdown();
    if (filterable) {
      filter(data, event.target.value);
    }
    if (allowCustom) {
      setInputValue(event.target.value);
      const item = validate(event);
      handleValueChange(formatEvent(event, event.target.value, item));
    }
    if (hasNoValue(event.target.value)) {
      clearValue(event);
    }
    if (onTextChange) {
      onTextChange(event);
    }
  };

  const handleBlur = (event) => {
    closeDropdown();
    const item = validate(event);
    if (onBlur) {
      onBlur(formatEvent(event, inputValue, item));
    }
    if (!allowCustom && !item) {
      clearValue(event);
      //clearValue();
      if (onBlur) {
        setTimeout(() => {
          onBlur(formatEvent(event, null, item));
        });
      }
    }
  };

  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleKeyDown = (event) => {
    if (lock && !EventKeys.isTab(event)) {
      event.preventDefault();
      return;
    }
    if (EventKeys.isDelete(event)) {
      clearValue(event);
    } else if (EventKeys.isEnter(event)) {
      if (!isAutoComplete()) {
        event.preventDefault();
      }
      toggleDropdownContainer();
      setSelectableItemSelection(event);
    } else if (EventKeys.isTab(event)) {
      setSelectableItemSelection(event);
    } else if (EventKeys.isUp(event)) {
      openDropdown();
      setPreviousSelectableItem();
    } else if (EventKeys.isDown(event)) {
      openDropdown();
      setNextSelectableItem();
    } else if (EventKeys.isEscape(event)) {
      closeDropdown();
    } else if (EventKeys.isAltS(event) || EventKeys.isAltB(event)) {
      if (onShowMoreItems) {
        onShowMoreItems(event);
        closeDropdown();
      }
    } else {
      openDropdown();
    }

    if (onKeyDownChange) {
      onKeyDownChange(event);
    }
    event.stopPropagation();
  };

  const setSelectableItemSelection = (event, prevent = false) => {
    if (selectableItem) {
      setSelection(selectableItem, event);
      if (prevent) {
        event.preventDefault();
      }
    }
  };

  const validate = (event) => {
    let item = parseValidValue(inputValue);
    const text = parseText(item);
    if (event.target.value != text) {
      item = null;
    }
    return item;
  };

  const handleValueChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  const toggleDropdownContainer = () => {
    if (visibleDropdownContainer) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const formatEvent = (event, value, item) => {
    return {
      ...event,
      name: name,
      target: {
        ...event.target,
        name: name,
        item: item,
        value: value,
      },
      value: value,
    };
  };

  const filter = (data, value) => {
    let _filteredData = filterBySearchText(
      data,
      value,
      minFilterLength,
      filterCaseSensitivity,
      filterColumns
    );
    handleVisibleShowMoreItems(_filteredData);
    _filteredData = _filteredData.slice(skip, skip + pageSize);
    setFilteredData(_filteredData);
    setDefaultSelectableItem(value, _filteredData);
  };

  const setDefaultSelectableItem = (value, filteredData) => {
    setSelectableItem(null);
    if (hasNoValue(value) || filteredData.length == 0) {
      setSelectableItem(null);
      return;
    }
    if (filteredData.length) {
      setSelectableItem(filteredData[0]);
    }
  };

  const handleVisibleShowMoreItems = (_filteredData) => {
    setVisibleShowMoreItems(false);
    if (_filteredData.length > pageSize && onShowMoreItems) {
      setVisibleShowMoreItems(true);
    }
  };

  const hasNoValue = (value) => {
    return value === null || value === undefined || value === "";
  };

  const getDataItemKey = (data, item) => {
    dataItemKey && typeof item == "object"
      ? item[dataItemKey]
      : data.indexOf(item);
  };

  const clearValue = (event) => {
    if (lock) {
      return;
    }
    if (event) {
      if (onTextChange) {
        onTextChange(formatEvent(event, "", null));
      }
      handleValueChange(formatEvent(event, "", null));
      setSelection(null, event);
    }

    setDisplayValue("");
    setFilterValue("");
    setInputValue(null);
    filter(data, "");
    setSelectableItem(null);
    setTimeout(() => {
      setSelectableItem(null);
      if (scrollBar.current) {
        scrollBar.current.scrollTop(0);
      }
    });
    filter(data, "");
  };

  const openDropdown = () => {
    if (lock) {
      return;
    }
    if (inputRef) {
      inputRef.current.focus();
    }
    if (!visibleDropdownContainer) {
      setVisibleDropdownContainer(true);
      scrollToSelectedItem();
      setTimeout(() => {
        setDropdownPosition();
      });

      if (onOpen) {
        onOpen();
      }
    }
  };

  const closeDropdown = () => {
    if (filteredData.length == 0) {
      filter(data, "");
    }

    setSelectableItem(null);
    setVisibleDropdownContainer(false);
    if (onClose) {
      onClose();
    }
  };

  const handleItemSelection = (event, item) => {
    setSelection(item, event);
    closeDropdown();
  };

  const setSelection = (item, event) => {
    const text = parseText(item);
    setDisplayValue(text);
    const value = parseValue(item);
    setInputValue(value);
    if (event) {
      if (onTextChange) {
        onTextChange(formatEvent(event, text, item));
      }
      handleValueChange(formatEvent(event, value, item));
    }
  };

  const getSelectableItem = (prev = false) => {
    if (!selectableItem) {
      if (filteredData.length) {
        return filteredData[0];
      }
    } else {
      let index = filteredData.indexOf(selectableItem);
      index = prev ? index - 1 : index + 1;
      index = index < 0 ? 0 : index >= filteredData.length ? index - 1 : index;
      return filteredData[index];
    }
    return null;
  };

  const getSelectedItem = () => {
    return filteredData.find((x) => isSelected(x));
  };

  const setNextSelectableItem = () => {
    const selectableItem = getSelectableItem();
    setSelectableItem(selectableItem);
    scrollItem(selectableItem);
  };

  const setPreviousSelectableItem = () => {
    const selectableItem = getSelectableItem(true);
    setSelectableItem(selectableItem);
    scrollItem(selectableItem, false);
  };

  const scrollItem = (selectableItem, bottom = true) => {
    if (selectableItem) {
      const selectableItemIndex = filteredData.indexOf(selectableItem);
      const itemRef = itemRefs[selectableItemIndex];
      if (itemRef.current) {
        let scrollItemHeight = itemRef.current.offsetHeight;
        const itemOffset = scrollItemHeight * selectableItemIndex;
        const scrollTop = scrollBar.current.getScrollTop();
        const contentHeight = scrollBar.current.getClientHeight();
        const viewport = scrollTop + contentHeight;
        if (
          itemOffset < scrollTop ||
          itemOffset + scrollItemHeight > viewport
        ) {
          if (!bottom) {
            scrollItemHeight = scrollItemHeight * -1;
          }
          scrollBar.current.scrollTop(scrollTop + scrollItemHeight);
        }
      }
    }
  };

  const setDropdownPosition = () => {
    if (scrollBar.current && input.current) {
      const inputRect = input.current.getBoundingClientRect();
      const containerLeft = inputRect.left;
      const containerTop = inputRect.top + inputRect.height;

      const dropdownContainer =
        scrollBar.current.view.parentElement.parentElement;
      const parentContainer = scrollparent(dropdownContainer);
      const dropdownContainerRect = dropdownContainer.getBoundingClientRect();
      const dropdownContainerHeight = dropdownContainerRect.height;
      const parentContainerRect = parentContainer.getBoundingClientRect();

      const dropdownContainerOffsetTop = containerTop - parentContainerRect.top;
      const dropdownContainerOffsetTopWithHeight =
        containerTop + dropdownContainerHeight;
      const isVerticallyInViewPort =
        // top
        dropdownContainerOffsetTop >= 0 &&
        // bottom
        dropdownContainerOffsetTopWithHeight + 30 <= parentContainerRect.height;
      const positionDifference = dropdownContainerHeight + inputRect.height;
      if (isVerticallyInViewPort == false) {
        // Top
        setOpenTop(true);
        setContainerStyle({
          top: containerTop - positionDifference,
          left: containerLeft,
          height: dropdownContainerHeight,
        });
      } else {
        // Bottom
        setOpenTop(false);
        setContainerStyle({
          top: containerTop,
          left: containerLeft,
        });
      }
    }
  };

  const regex = /(auto|scroll)/;

  const style = (node, prop) =>
    getComputedStyle(node, null).getPropertyValue(prop);

  const scroll = (node) =>
    regex.test(
      style(node, "overflow") +
        style(node, "overflow-y") +
        style(node, "overflow-x")
    );

  const scrollparent = (node) =>
    !node || node === document.body
      ? document.body
      : scroll(node)
      ? node
      : scrollparent(node.parentNode);

  const scrollToSelectedItem = () => {
    const selectedItem = getSelectedItem();
    if (selectedItem) {
      setTimeout(() => {
        scrollToItem(selectedItem);
      });
    }
  };

  const scrollToItem = (selectableItem) => {
    const selectableItemIndex = filteredData.indexOf(selectableItem);
    filteredData.every((x, i) => {
      setSelectableItem(selectableItem);
      scrollItem(x);
      return i != selectableItemIndex;
    });
  };

  const isSelected = (item) => {
    const itemValue = parseValue(item);
    const selectableItemValue = selectableItem
      ? parseValue(selectableItem)
      : null;
    return selectableItem
      ? selectableItemValue == itemValue
      : itemValue == inputValue;
  };

  const parseText = (item) => {
    if (!item) {
      return item;
    }
    if (textField) {
      return item[textField];
    }
    return item;
  };

  const parseValidValue = (value) => {
    if (hasNoValue(value)) {
      return value;
    }
    const item = data.find((x) => (valueField ? x[valueField] : x) == value);
    return item;
  };

  const parseValue = (value) => {
    if (!value) {
      return "";
    }
    if (value && valueField) {
      return value[valueField] == undefined ? "" : value[valueField];
    }
    return value;
  };

  const handleDataChange = () => {
    const _filteredData = pageSize ? data.slice(skip, skip + pageSize) : data;
    setFilteredData(_filteredData);

    // add or remove refs
    const refs = [];
    (_filteredData || []).forEach((item) => {
      refs.push(React.createRef());
    });
    setItemRefs(refs);
    handleVisibleShowMoreItems(data);
  };

  const hasControlValue = () =>
    !hasNoValue(inputValue) || !hasNoValue(displayValue);

  const isAutoComplete = () => {
    return type == DropdownType.AutoComplete;
  };

  const setPlaceholder = () => {
    switch (type) {
      case DropdownType.Dropdown:
        {
          placeholder = placeholder || "Select";
        }
        break;
      case DropdownType.Combobox:
        {
          placeholder = placeholder || "Enter text and select";
        }
        break;
      case DropdownType.AutoComplete:
        {
          placeholder = placeholder || "Enter text";
        }
        break;
    }
  };

  const setIcons = () => {
    const defaultPreEndIcon = (
      <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
    );
    const defaultOnPreEndIconClick = clearValue;

    preEndIcon =
      preEndIcon ||
      (hasControlValue() && !disabled && !lock && defaultPreEndIcon);
    onPreEndIconClick = onPreEndIconClick || defaultOnPreEndIconClick;

    let defaultEndIcon = <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>;
    let defaultOnEndIconClick = null;
    switch (type) {
      case DropdownType.Dropdown:
        {
          defaultEndIcon = <CaretDownOutlined />;
          defaultOnEndIconClick = toggleDropdownContainer;
        }
        break;
      case DropdownType.Combobox:
        {
          defaultEndIcon = <SearchOutlined />;
          defaultOnEndIconClick = onEndIconClick;
        }
        break;
      case DropdownType.AutoComplete:
        {
          defaultEndIcon = endIcon;
          defaultOnEndIconClick = onEndIconClick;
        }
        break;
    }

    const loadingEndIcon = <LoadingOutlined />;
    const loadingOnEndIconClick = null;

    endIcon = loading
      ? loadingEndIcon
      : !disabled && !lock && (endIcon || defaultEndIcon);
    onEndIconClick = loading
      ? loadingOnEndIconClick
      : !disabled && !lock && (onEndIconClick || defaultOnEndIconClick);
  };

  const defineItemRender = () => {
    if (!itemRender) {
      itemRender = (li, itemProps) => {
        const itemChildren = textField ? (
          <span>{itemProps.dataItem[textField]}</span>
        ) : (
          <span>{itemProps.dataItem}</span>
        );
        return React.cloneElement(li, li.props, itemChildren);
      };
    }
  };

  const getInputProps = () => {
    return {
      name: name,
      value: displayValue,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      placeholder: placeholder,
      preEndIcon: preEndIcon,
      onPreEndIconClick: onPreEndIconClick,
      endIcon: endIcon,
      onEndIconClick: onEndIconClick,
      disabled: disabled,
      tabIndex: tabIndex,
      lock: lock,
      autoFocus: autoFocus,
      ...props,
    };
  };

  const handleValueDataChange = (clearValueIfNotAutoComplete) => {
    const item = parseValidValue(value);
    if (item) {
      setSelection(item);
      if (!visibleFilterInput) {
        closeDropdown();
      }
    } else if (
      !allowCustom &&
      (clearValueIfNotAutoComplete ? true : !isAutoComplete())
    ) {
      clearValue();
    }
    if (allowCustom) {
      setDisplayValue(value);
      setInputValue(value);
    }
  };

  const handleInputRef = (ref) => {
    setInputRef(ref);
  };

  const init = () => {
    defineItemRender();
    setPlaceholder();
    setIcons();
  };

  init();

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
    if (data && data.length > 0) {
      handleDataChange();
      handleValueDataChange();
    }
  }, [data]);

  useEffect(() => {
    handleValueDataChange(true);
  }, [value]);

  useEffect(() => {
    if (visibleDropdown) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }, [visibleDropdown]);

  return (
    <div
      className={classNames(
        "drop-down",
        { "no-value": hasNoValue(displayValue) },
        { "show-more-items": visibleShowMoreItems },
        { "hide-no-data": !visibleNoData && !filteredData.length },
        className
      )}
    >
      <div className="control">
        <div className="drop-down-input" ref={input}>
          <Input {...getInputProps()} onRef={handleInputRef} lock={lock} />
          <input type="hidden" value={inputValue} />
        </div>
        <Portal>
          {visibleDropdownContainer && input.current && (
            <div
              className={classNames(
                "drop-down-container",
                { "open-top": openTop },
                className
              )}
              style={{
                width: input.current.offsetWidth,
                top:
                  input.current.getBoundingClientRect().top +
                  input.current.getBoundingClientRect().height,
                left: input.current.getBoundingClientRect().left,
                ...containerStyle,
              }}
            >
              {visibleFilterInput && (
                <div className="header">
                  <ul>
                    <li>
                      <Input
                        {...getInputProps()}
                        value={filterValue}
                        onChange={handleFilterInputChange}
                        lock={lock}
                        value={null}
                        preEndIcon={null}
                        onPreEndIconClick={null}
                        endIcon={null}
                        onEndIconClick={null}
                        tabIndex={1}
                        autoFocus={true}
                      />
                    </li>
                  </ul>
                </div>
              )}

              <Scrollbars
                ref={scrollBar}
                className="custom-scrollbar-container"
                autoHeight={true}
                autoHeightMax={
                  itemRefs.length && itemRefs[0].current
                    ? (visibleDropdownItems + 1) *
                      itemRefs[0].current.offsetHeight
                    : 180
                }
                style={{
                  minWidth: input.current.offsetWidth,
                  width: input.current.offsetWidth,
                }}
                hideTracksWhenNotNeeded={true}
              >
                <ul>
                  {filteredData.length ? (
                    filteredData.map((item, index) => {
                      const props = {
                        ref: itemRefs[index],
                        key: getDataItemKey(filteredData, item),
                        onMouseDown: (e) => e.preventDefault(),
                        onClick: (event) => handleItemSelection(event, item),
                        className: classNames({
                          selected: isSelected(item),
                        }),
                        dataItem: item,
                      };
                      return itemRender(
                        React.createElement("li", props),
                        props
                      );
                    })
                  ) : visibleNoData ? (
                    <li className="no-data">{noDataText}</li>
                  ) : null}
                </ul>
              </Scrollbars>

              {visibleShowMoreItems && (
                <div
                  className="footer"
                  style={{ width: input.current.offsetWidth }}
                >
                  <ul>
                    <li
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={onShowMoreItems}
                    >
                      <Label link={true} title="Select to see more results" />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {visibleDropdownContainer && input.current && (
            <div className="drop-down-backdrop" onClick={closeDropdown}></div>
          )}
        </Portal>
      </div>
    </div>
  );
};

export { dropdown as Dropdown };
