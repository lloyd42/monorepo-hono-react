import { Avatar, Button, Dropdown, Space, Input } from "antd";
import { SkinOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useSettingsState } from "@/stores/settings";
import { useDebounceFn } from "@/hooks/useDebounceFn";
import styles from "./index.module.scss";

const HeaderRight = () => {
  const { colorPrimary, setColorPrimary } = useSettingsState();

  const changeMainColor = useDebounceFn(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColorPrimary(e.target.value);
    },
    500
  );

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>退出登录</span>,
    },
    {
      key: "2",
      label: "个人中心",
    },
  ];

  return (
    <Space size={20} direction="horizontal">
      <div className={styles.skin}>
        <Button type="primary" shape="circle" icon={<SkinOutlined />} />
        <Input
          type="color"
          className={styles.skin_input}
          defaultValue={colorPrimary}
          onChange={changeMainColor}
        />
      </div>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Avatar
          src="https://p3-passport.byteimg.com/img/user-avatar/36aebd145b4f04612071b7fd57e7ad85~64x64.awebp"
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Dropdown>
    </Space>
  );
};

export default HeaderRight;
