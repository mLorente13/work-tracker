import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function DropdownSetting({ items, onChange, value }) {
  return (
    <Dropdown
      style={styles.dropdown}
      data={items}
      value={value}
      labelField={"label"}
      valueField={"value"}
      onChange={onChange}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
