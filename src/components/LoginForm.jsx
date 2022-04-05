import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { MdHighlight } from "react-icons/md";
import { Formik, Form, useField } from "formik";
import { Link } from "react-router-dom";
import { login } from "../actions/auth";
import { useDispatch } from "react-redux";

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <FormControl isInvalid={meta.error && meta.touched} my={5} isRequired>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <Input {...field} {...props} _focus={{ border: "3px solid #f5ba13" }} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  return (
    <Flex
      flexDir="column"
      borderRadius="12px"
      bg="#fff"
      w="35vw"
      h="60vh"
      p={5}
      justifyContent="center"
      boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
    >
      <Flex justifyContent="center" mb={3}>
        <MdHighlight
          style={{ display: "inline", marginRight: 15 }}
          fontSize={"40px"}
          color="#f5ba13"
        />
        <Heading size="lg" color="#f5ba13" mt={2}>
          Welcome Back You!
        </Heading>
      </Flex>
      <Flex flexDir="column" justifyContent="center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            dispatch(login(values.email, values.password));
            setSubmitting(false);
          }}
        >
          <Form>
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Flex alignItems="center" flexDir="column" mt={5}>
              <Button
                _hover={{ background: "#f5ba13", transform: "scale(1.1)" }}
                bg="#f5ba13"
                color="#fff"
                size="lg"
                type="submit"
              >
                Log in
              </Button>
              <Text mt={3} fontWeight="bold">
               Don't have an account?{" "}
                <Link to="/register" style={{ color: "#f5ba13" }}>
                  <u>Register here</u>
                </Link>
              </Text>
            </Flex>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  );
};
