import { Box, Flex, Text } from "@chakra-ui/core";
import React, { FC } from "react";
import { GiLightBulb } from "react-icons/gi";
import { User } from "../../types";

export interface UserStatsProps {
  user: User;
}

const UserStats: FC<UserStatsProps> = ({ user }) => {
  return (
    <Flex alignItems="center" fontSize="xs" textColor="gray.800">
      <Box as={GiLightBulb} color="yellow.400" />
      <Text ml={2}>{user.points}</Text>
    </Flex>
  );
};

export default UserStats;
