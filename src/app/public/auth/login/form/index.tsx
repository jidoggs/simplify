import { Button, Checkbox, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../../../../common/hooks/useAuth";
import { LoginFormType, resolver, defaultValues } from "./schema";

function LoginForm() {
  const { loginRQ } = useAuth();

  const form = useForm<LoginFormType>({
    resolver,
    defaultValues,
  });

  const errors = form.formState.errors;

  const onSubmit = (payload: LoginFormType) => {
    loginRQ.mutate({
      data: payload,
    });
  };
  return (
    <Form layout="vertical" onFinish={form.handleSubmit(onSubmit)}>
      <Form.Item
        label="Email"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <Input {...field} placeholder="your@email.com" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        validateStatus={errors.password ? "error" : ""}
        help={errors.password?.message}
      >
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <Input.Password {...field} placeholder="••••••" />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Controller
          name="remember"
          control={form.control}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value}>
              Remember me
            </Checkbox>
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loginRQ.isPending}
        >
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
