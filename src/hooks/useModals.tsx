import { useState } from "react";

export default function useModals () {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return{
      showModal,
      handleOk,
      handleCancel,
      loading,
      visible
  }
};
