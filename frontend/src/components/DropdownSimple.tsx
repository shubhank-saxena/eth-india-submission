import styled, { CSSProperties } from "styled-components";
import React, { useEffect } from "react";
import {
  RiArrowDropDownLine,
  RiArrowDropRightLine,
  RiArrowDropUpLine,
} from "react-icons/ri";
import useHandleClickOutside from "../hooks/useHandleClickOutside";
import SmallLoader from "./SmallLoader";
import { debounce } from "../utils/persona";

interface isOption {
  value: string;
  label: string;
  children?: isOption[];
  icon?: React.ReactNode;
  imageUrl?: string;
}

const DropdownSimple = ({
  options = [],
  label,
  placeholder = "Select",
  style,
  search = true,
  onChange,
  selectedChoice,
  searchEndpoint,
  handleNetworkSearch,
}: {
  options?: isOption[];
  label?: string;
  placeholder?: string;
  style?: CSSProperties;
  search?: boolean;
  onChange: (
    option: isOption,
    subOption?: isOption,
    subOption2?: isOption
  ) => void;
  selectedChoice?: string;
  searchEndpoint?: string;
  handleNetworkSearch?: (searchValue: string, searchEndpoint: string) => any;
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  useHandleClickOutside(dropdownRef, () => setShowDropdown(false));
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [showSmallLoader, setShowSmallLoader] = React.useState(false);
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const searchValue = e.target.value.trim().toLowerCase();
    if (searchValue.length > 0) {
      if (searchEndpoint && handleNetworkSearch) {
        setShowSmallLoader(true);
        const filteredOptions = await handleNetworkSearch(
          searchValue,
          searchEndpoint
        );
        // console.log(filteredOptions);
        setFilteredOptions(filteredOptions);
        setShowSmallLoader(false);
      } else {
        const filteredOptions = options.filter((option) => {
          if (option.label.toLowerCase().includes(searchValue)) {
            return true;
          }
          if (option.children) {
            let hasChild = false;
            option.children.forEach((child) => {
              if (child.label.toLowerCase().includes(searchValue)) {
                hasChild = true;
              }
              if (child.children) {
                child.children.forEach((grandChild) => {
                  if (grandChild.label.toLowerCase().includes(searchValue)) {
                    hasChild = true;
                  }
                });
              }
            });
            return hasChild;
          }
          return false;
        });
        setFilteredOptions(filteredOptions);
      }
    } else {
      setFilteredOptions(options);
    }
  };

  // functions to debounce the search

  const debouncedHandleSearch = debounce(handleSearch, 500);
  useEffect(() => {
    selectedChoice && setSelectedOption(selectedChoice);
  }, [selectedChoice]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options, showDropdown]);

  useEffect(() => {}, [selectedOption]);
  return (
    <div style={style} ref={dropdownRef}>
      {label && <Label>{label}</Label>}
      <Container
        onClick={() => setShowDropdown(!showDropdown)}
        showDropdown={showDropdown}
      >
        <SelectedOption>{selectedOption || placeholder}</SelectedOption>
        {showDropdown ? (
          <RiArrowDropUpLine size={20} />
        ) : (
          <RiArrowDropDownLine size={20} />
        )}

        {showDropdown && (
          <OptionsContainer>
            {search && (
              <OptionSearch
                placeholder="Search"
                autoFocus
                onChange={debouncedHandleSearch}
              />
            )}
            {showSmallLoader && <SmallLoader />}
            {filteredOptions?.map((option) => (
              <Option
                key={option.value}
                onClick={() => {
                  // console.log("Children", option.children);
                  option.children === undefined &&
                    setSelectedOption(option.label);
                  option.children === undefined && onChange(option);
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  {option.icon && option.icon}
                  {option.imageUrl && (
                    <img
                      src={option.imageUrl}
                      alt={option.label}
                      style={{ width: "24px", height: "24px" }}
                    />
                  )}
                  <span>{option.label}</span>
                </div>
                {option.children !== undefined &&
                  option.children.length > 0 && <RiArrowDropRightLine />}
                {option.children !== undefined && option.children.length > 0 && (
                  <SubOptionsContainer>
                    {option.children.map((subOption) => (
                      <Option
                        key={subOption.value}
                        onClick={() => {
                          // console.log("Children", subOption.children);

                          subOption.children === undefined &&
                            setSelectedOption(
                              option.label + " -> " + subOption.label
                            );
                          subOption.children === undefined &&
                            onChange(option, subOption);
                          // e.stopPropagation();
                        }}
                      >
                        {subOption.label}
                        {subOption.children !== undefined &&
                          subOption.children.length > 0 && (
                            <RiArrowDropRightLine />
                          )}
                        {subOption.children !== undefined &&
                          subOption?.children?.length > 0 && (
                            <SubOptionsContainer>
                              {subOption?.children?.map((subOption2) => (
                                <Option
                                  key={subOption2.value}
                                  onClick={() => {
                                    setSelectedOption(
                                      option.label +
                                        " -> " +
                                        subOption.label +
                                        " -> " +
                                        subOption2.label
                                    );
                                    onChange(option, subOption, subOption2);
                                    // e.stopPropagation();
                                  }}
                                >
                                  {subOption2.label}
                                </Option>
                              ))}
                            </SubOptionsContainer>
                          )}
                      </Option>
                    ))}
                  </SubOptionsContainer>
                )}
              </Option>
            ))}
          </OptionsContainer>
        )}
      </Container>
    </div>
  );
};

export default DropdownSimple;
const Container = styled.div<{ showDropdown: boolean }>`
  /* border: ${(props) => (props.showDropdown ? "none" : "1px solid grey")}; */
  border-radius: 8px;
  position: relative;
  padding-right: 16px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;
const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  /* padding: 16px; */
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #f5f5f5;
`;
const Option = styled.div`
  padding: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #aeb1b3;
  :hover {
    border-radius: 8px;
    background: #33383f;
    color: #ffffff;
    > * {
      display: block;
    }
  }
`;
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1000;
  /* border: 1px solid grey; */
  \box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.14),
    0px 4px 6px -2px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  background: #27272a;
  width: 100%;
  top: 0%;
  left: 0;
  padding: 4px;
`;
const SubOptionsContainer = styled(OptionsContainer)`
  left: 100%;
  top: 0;
  display: none;
`;
const OptionSearch = styled.input`
  cursor: pointer;
  padding: 16px;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 8px;
`;
const Label = styled.p`
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  color: #a1a1aa;
  margin-bottom: 8px;
`;
