import { useState, ChangeEvent, FormEvent } from "react";
import { IoMdClose } from "react-icons/io";
import { PaymentCreateProps } from "@/types/payment";
import useCreatePayment from "@/apis/payment/useCreatePayment";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [address, setAddress] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");

  const { mutate: createPayment } = useCreatePayment();

  const handlAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlePrivateKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paymentData: PaymentCreateProps = {
      address,
      privateKey,
    };

    createPayment(paymentData, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error("Payment creation failed:", error);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl relative w-96">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <IoMdClose />
        </button>

        <h2 className="text-center text-xl mb-6">지갑 등록</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={address}
              onChange={handlAddressChange}
              placeholder="MetaMask 지갑 주소를 입력해주세요"
              className="border border-gray-300 px-4 py-2 w-full rounded-md"
              required
            />
          </div>

          <input
            type="text"
            value={privateKey}
            onChange={handlePrivateKeyChange}
            placeholder="MetaMask private Key를 입력해주세요"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-2 flex w-full justify-center rounded-md cursor-pointer"
          >
            완료하기
          </button>
        </form>
      </div>
    </div>
  );
}
