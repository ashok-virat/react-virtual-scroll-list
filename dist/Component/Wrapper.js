"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
const VirtualListWrapper = _ref => {
  let {
    items,
    height,
    width,
    listId
  } = _ref;
  const [virEntItems, setVirEntItems] = (0, _react.useState)({});
  const isPartiallyVisible = item => {
    const rect = item.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < viewportHeight && rect.bottom >= 0;
  };
  const isVisibleInDOM = value => {
    return virEntItems[value === null || value === void 0 ? void 0 : value.id] ? true : virEntItems[value.id];
  };
  const findVisibleListItem = (0, _react.useCallback)(() => {
    document.querySelectorAll(".virtual-element").forEach(item => {
      if (isPartiallyVisible(item)) {
        const pageNumber = item.id;
        setVirEntItems(prevState => {
          return {
            ...prevState,
            [pageNumber]: {
              loaded: true,
              cardNumber: item.getAttribute('data-card-number')
            }
          };
        });
      } else {
        setVirEntItems(prevItems => {
          const {
            [item.id]: removed,
            ...newItems
          } = prevItems;
          return newItems;
        });
      }
    });
  }, []);
  (0, _react.useEffect)(() => {
    findVisibleListItem();
  }, [items, findVisibleListItem]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "".concat(height, "px"),
      overflow: 'scroll',
      width: "".concat(width, "px")
    },
    onScroll: findVisibleListItem
  }, items.map((item, index) => /*#__PURE__*/React.createElement("div", {
    className: "virtual-element",
    key: index,
    style: {
      minHeight: '100px'
    },
    id: "card-".concat(index),
    "data-card-number": index + 1
  }, isVisibleInDOM({
    id: "".concat(listId, "-").concat(index)
  }) ? item : "")));
};
var _default = exports.default = VirtualListWrapper;