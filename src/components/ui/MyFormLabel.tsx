import { FormLabel, FormLabelProps } from "@chakra-ui/react";
import { FC } from "react";

export interface MyFormLabelProps extends FormLabelProps {}

const MyFormLabel: FC<MyFormLabelProps> = ({ children }) => {
  return (
    <FormLabel
      style={{ fontVariant: "all-small-caps" }}
      textTransform="uppercase"
      textColor="gray.600"
    >
      {children}
    </FormLabel>
  );
};

export default MyFormLabel;
