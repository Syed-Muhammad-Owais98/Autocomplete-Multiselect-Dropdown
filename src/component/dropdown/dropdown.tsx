import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { DropdownProps, DropDownItem } from "./interface";
import ReactDOM from "react-dom";

const DropDown = ({
  onValueSelected,
  isMultiSelect = false,
  listItems = [],
  fieldTitle = "Use title property",
  selectedItem,
  selectedItems = [],
  showSearch = true,
  showDialogButton = true,
  showDialogTitle = true,
  dialogListMaxHeight = 290,
  isModal = false,
  disabled = false,
  destinationRef,
}: DropdownProps) => {
  const [isOpen, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownSelectedDiv: any = useRef<HTMLDivElement>();
  const refRoot = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onItemClickMultiSelect = (itemClicked: DropDownItem) => {
    const itemsWithoutClickedItem = selectedItems.filter(
      (item) => item.id !== itemClicked.id
    );
    // selected items does not have the item clicked
    selectedItems.length === itemsWithoutClickedItem.length
      ? onValueSelected([...selectedItems, itemClicked])
      : onValueSelected(itemsWithoutClickedItem);

    return true;
  };

  const onCancelClick = (itemClicked: DropDownItem) => {
    const itemsWithoutClickedItem = selectedItems.filter(
      (item) => item.id !== itemClicked.id
    );
    onValueSelected(itemsWithoutClickedItem);
  };

  const toggleVisibility = () => {
    setOpen(true);
  };

  const onItemClickSingleSelect = (item: DropDownItem) => {
    if (selectedItem === item) {
      onValueSelected({ id: 0, name: "" });
      setSearchText("");
      return;
    }
    onValueSelected(item);
    setSearchText(item.name);
  };

  const onAllButtonClick = (e: any) => {
    e.preventDefault();
    onValueSelected([...listItems]);
  };

  const onNoneButtonClick = (e: any) => {
    e.preventDefault();
    onValueSelected();
    if (!isMultiSelect) {
      toggleVisibility();
    }
  };

  const onSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const getDropDownContent = (allSelected: boolean) => {
    let listItemComponents;
    let dialogButton;
    const reorderedListItems = [...listItems];
    if (isMultiSelect) {
      dialogButton = (
        <div className=" ml-auto my-1 flex justify-between">
          <button
            className={`text-xs px-2 mx-2 border-2 rounded ${
              allSelected ? "hover:bg-blue-50" : ""
            } `}
            onClick={(e) => onNoneButtonClick(e)}
            disabled={!allSelected}
          >
            None
          </button>

          <button
            className="text-xs px-2 mx-2 border-2 border-pk-blue rounded hover:bg-blue-50"
            onClick={(e) => onAllButtonClick(e)}
          >
            All
          </button>
        </div>
      );

      listItemComponents = listItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            onItemClickMultiSelect(item);
          }}
          className={`${
            searchText.trim().length !== 0 &&
            !item.name.toLowerCase().includes(searchText.toLowerCase().trim())
              ? "hidden"
              : "hover:bg-blue-50"
          } px-6 py-4 h-full border-b-[1px] border-slate-300 cursor-pointer items-center space-between`}
        >
          <div className=" items-center flex">
            {selectedItems !== undefined &&
            selectedItems.filter((sItem) => sItem.id === item.id).length > 0 ? (
              <HiOutlineCheck
                size={24}
                color="#e4e4e4"
                className="rounded-[5px]  bg-sky-800 px-[2px] pt-[2px] mr-2 min-w-[24px]"
              />
            ) : (
              <div className="rounded-[5px]  bg-gray-200 w-6 h-6 mr-2 min-w-[24px]"></div>
            )}
            <div className="text-base font-bold text-gray-600 col-span-5">
              {item.name}
            </div>
          </div>
        </div>
      ));
    }
    if (!isMultiSelect) {
      const index = reorderedListItems.findIndex(
        (item) => selectedItem !== undefined && item.id === selectedItem.id
      );
      if (index !== -1 && selectedItem !== undefined) {
        reorderedListItems.splice(index, 1);
        reorderedListItems.unshift(selectedItem);
      }
      dialogButton = (
        <div className="flex justify-end my-1">
          <button
            className="text-xs px-2 mx-2 border-2 rounded hover:bg-blue-50"
            onClick={(e) => onNoneButtonClick(e)}
          >
            None
          </button>
        </div>
      );
      listItemComponents = reorderedListItems.map((item) => (
        <div
          onClick={() => {
            onItemClickSingleSelect(item);
          }}
          key={item.id}
          className={`${
            searchText.trim().length !== 0 &&
            !item.name.toLowerCase().includes(searchText.toLowerCase().trim())
              ? "hidden"
              : "hover:bg-blue-50"
          } px-6 py-4 h-full border-b-[1px] border-slate-300 cursor-pointer`}
        >
          <div className="flex items-center">
            {selectedItem !== undefined && selectedItem.name === item.name ? (
              <HiOutlineCheck
                size={24}
                color="#e4e4e4"
                className="rounded-[5px]  bg-sky-800 px-[2px] pt-[2px] mr-2 min-w-[24px]"
              />
            ) : (
              <div className="rounded-[5px]  bg-gray-200 w-6 h-6 mr-2 min-w-[24px]"></div>
            )}
            <div className="text-base font-bold text-gray-600">{item.name}</div>
          </div>
        </div>
      ));
    }

    const dialogHeight =
      dialogListMaxHeight +
      (showDialogButton ? 22 : 0) +
      (showSearch ? 20 : 0) +
      (showDialogTitle ? 22 : 0);
    let dropdownSelectedDivHeight = 0;
    let showAbove = false;
    if (dropdownSelectedDiv.current) {
      dropdownSelectedDivHeight = dropdownSelectedDiv.current.clientHeight;
      const heightDiff =
        window.innerHeight +
        window.scrollY -
        (dropdownSelectedDivHeight +
          dialogHeight +
          dropdownSelectedDiv.current.parentElement.offsetTop);
      showAbove = heightDiff < 0;
    }
    if (!refRoot.current) {
      return null;
    }
    const parent = refRoot.current.getBoundingClientRect();
    const portalParent =
      !destinationRef || destinationRef.current === null
        ? null
        : destinationRef.current.getBoundingClientRect();

    return ReactDOM.createPortal(
      <div
        className={`absolute z-50 bg-white rounded-b-lg mt-[2px] border-b-2 border-b-gray-200 shadow-2xl -ml-0.5 ${
          !isOpen ? " hidden" : ""
        }`}
        ref={dropdownRef}
        style={{
          top: portalParent
            ? `${parent.top - portalParent.top + parent.height - 2}px`
            : `${parent.height - 2}px`,
          left: portalParent
            ? `${parent.left - portalParent.left + 2}px`
            : `${2}px`,
          width: portalParent ? `${parent.width}px` : `${parent.width}px`,
          transform: showAbove
            ? `translateY(calc(-100% - ${dropdownSelectedDivHeight}px))`
            : "translateY(2px)",
        }}
      >
        {showDialogButton ? dialogButton : null}
        {showDialogTitle ? (
          <div className="dropdown-listTitle" title={fieldTitle}>
            {fieldTitle}
          </div>
        ) : null}

        <div
          className="overflow-y-auto scrollbar-dropdown"
          style={{ maxHeight: dialogListMaxHeight }}
        >
          {listItemComponents}
        </div>
      </div>,
      !destinationRef || destinationRef.current == null
        ? refRoot.current
        : destinationRef.current
    );
  };

  let selectionText = "";
  const classNameFieldBox = `  ${isOpen ? "rounded-t-xl" : "rounded-xl"}`;

  useEffect(() => {
    if (selectedItem && !isMultiSelect) {
      setSearchText(selectedItem.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  if (isMultiSelect) {
    const count = selectedItems !== undefined ? selectedItems.length : 0;
    selectionText = `${count} Items Selected`;
    if (count === 1)
      selectionText = selectedItems !== undefined ? selectedItems[0].name : "";
    if (count === 0) selectionText = "None selected";
    if (count === listItems.length) selectionText = "All selected";
  }

  if (!isMultiSelect) {
    selectionText =
      selectedItem !== undefined &&
      selectedItem != null &&
      selectedItem.name !== undefined
        ? selectedItem.name
        : "None selected";
  }

  useEffect(() => {
    function handleDocumentClick(event: any) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        isOpen
      ) {
        if (selectedItem) {
          selectedItem.id > 0
            ? setSearchText(selectedItem.name)
            : setSearchText("");
        }
        setOpen(false);
        document.removeEventListener("mousedown", handleDocumentClick);
      }
    }

    if (isOpen === true) {
      document.addEventListener("mousedown", handleDocumentClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className="grid ">
      {fieldTitle !== "Use title property" && (
        <label className="text-pk-gray text-xs font-bold p-0 px-1 mb-2 h-[15px] ml-2 ">
          {fieldTitle}
        </label>
      )}
      <div
        className={`inline-block relative mr-1 ${
          disabled ? "cursor-not-allowed bg-gray-200 rounded-xl" : ""
        }`}
        ref={refRoot}
        tabIndex={0}
      >
        <div
          className={
            isModal ? `${classNameFieldBox} ` : `${classNameFieldBox} `
          }
        >
          <div
            ref={dropdownSelectedDiv}
            className={`min-h-[50px] max-h-24 scrollbar-dropdown ${
              disabled ? "bg-pk-light-grey" : "bg-white"
            }  overflow-y-auto overflow-x-hidden select-none border-gray-600  py-1.5 px-4 w-full text-md focus:outline-none ${
              !isMultiSelect ? " grid grid-cols-8 " : " flex "
            } ${isOpen ? "rounded-t-xl" : "rounded-xl"}`}
            onClick={(e) => {
              if (!disabled) toggleVisibility();
              e.stopPropagation();
            }}
            id="test"
          >
            <div
              className={`${
                isMultiSelect
                  ? "flex flex-1 items-center flex-wrap "
                  : "col-span-7 "
              }${isModal ? "text-md   " : "text-sm text-left"} `}
            >
              <input
                className={` p-2 w-full min-w-fit ${
                  disabled ? "cursor-not-allowed" : ""
                }`}
                value={searchText}
                onChange={onSearch}
                disabled={disabled}
                placeholder="Search"
                onFocus={() => {
                  toggleVisibility();
                }}
              />
              {selectedItems.length > 0 &&
                isMultiSelect &&
                selectedItems.map((item) => {
                  return (
                    <div className="flex items-center p-2 bg-gray-100 m-1 rounded">
                      <span className="max-w-[100px] truncate ">
                        {item.name}
                      </span>
                      <AiOutlineClose
                        size={20}
                        className="ml-1 cursor-pointer"
                        onClick={() => onCancelClick(item)}
                      />
                    </div>
                  );
                })}
            </div>
            {isOpen ? (
              <div
                onClick={() => {
                  if (!isMultiSelect) {
                    onValueSelected(undefined);
                  } else {
                    onValueSelected([]);
                  }
                  setOpen(false);
                  setSearchText("");
                }}
                className={`self-center ${
                  !isMultiSelect ? "col-span-1 flex ml-auto" : ""
                }`}
              >
                <AiOutlineClose
                  size={15}
                  color="#025578"
                  onClick={() => setOpen(false)}
                />
              </div>
            ) : selectedItems.length > 0 || searchText !== "" ? (
              !disabled && (
                <div
                  className={`self-center ${
                    !isMultiSelect ? "col-span-1 flex ml-auto " : ""
                  }`}
                  onClick={(e) => {
                    if (!isMultiSelect) {
                      onValueSelected(undefined);
                    } else {
                      onValueSelected([]);
                    }
                    setSearchText("");
                    e.stopPropagation();
                  }}
                ></div>
              )
            ) : (
              <div
                className={`self-center ${
                  !isMultiSelect ? "col-span-1 flex justify-end" : ""
                }`}
              >
                <BsChevronRight size={15} color="#025578" />
              </div>
            )}
          </div>

          {getDropDownContent(
            selectionText === "All selected" || selectedItems.length > 0
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
