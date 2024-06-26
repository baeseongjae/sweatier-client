"use client";

import api from "@/api";
import RoundButton from "@/components/Buttons/RoundButton";
import Page from "@/components/Page";
import useQueryGetProfile from "@/hooks/services/userProfile/useQuery.getProfile";
import { bankName } from "@/utils/bankName";
import { Gender } from "@/utils/gender";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEventHandler, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropDownBoxOfBank from "./_components/DropDownBoxOfBank";
import PhoneNumberInput from "./_components/PhoneNumberInput";
import RegistrationInput from "./_components/RegistrationInput";

function UserRegistrationPage() {
  const { mutateAsync: registerUser, isPending } = useMutation({
    mutationFn: api.user.registerUser,
  });

  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<Gender | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedBankName, setSelectedBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [oneLiner, setOneLiner] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { refetch: refetchProfile } = useQueryGetProfile();

  // 성별선택
  const handleSelectGender = (gender: Gender) => {
    setGender(gender);
  };

  // 카메라 아이콘 클릭
  const handleClickCameraIcon = () => {
    fileInputRef.current?.click();
  };

  // 이미지 선택
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  // 은행명 선택
  const handleSelectBankName = (bankName: string) => {
    setSelectedBankName(bankName);
  };

  // 폼데이터 제출
  const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (!file) return alert("프로필 이미지는 필수입니다!");
      const formData = new FormData();

      formData.append("gender", gender);
      formData.append("phoneNumber", phoneNumber);
      formData.append("bankName", selectedBankName);
      formData.append("accountNumber", accountNumber);
      formData.append("nickName", nickname);
      formData.append("oneLiner", oneLiner);
      formData.append("file", file);

      await registerUser(formData);
      await refetchProfile();
      toast.success(`환영합니다 ${nickname}님!`);

      router.push("/");
    } catch (error) {
      alert("유저 정보 등록에 실패하였습니다.");
    }
  };

  return (
    <Page>
      <section className="pb-3 w-full lg:max-w-[768px] text-neutral-90">
        <h2 className="a11y-hidden">유저 정보 등록</h2>
        <form
          className="mx-auto max-w-lg lg:max-w-[768px]"
          onSubmit={handleSubmitForm}
        >
          <p className="pb-4 text-2xl font-black tracking-[-.1em] lg:text-[28px]">
            유저 정보 등록
          </p>
          <p className="font-bold text-xs tracking-tighter lg:hidden">
            원활한 서비스 사용을 위해
          </p>
          <p className="font-bold text-xs tracking-tighter lg:hidden">
            아래의 필수사항을 입력해주세요
          </p>
          <ul className="flex flex-col py-10 gap-y-7">
            <li className="flex flex-col pb-6">
              <div className="w-32 h-32 mx-auto relative">
                <div className="w-full h-full rounded-full bg-neutral-30 mx-auto flex relative overflow-hidden">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt="이미지"
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                <button type="button" onClick={handleClickCameraIcon}>
                  <Image
                    src="/assets/user-registration_page/camera.svg"
                    alt="카메라"
                    width={36}
                    height={36}
                    className="absolute bottom-0 right-2"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleSelectImage}
                    className="a11y-hidden"
                  />
                </button>
              </div>
              <p className="tracking-tighter text-[11px] text-neutral-50 mx-auto max-w-[198px] mt-1 lg:pt-3 hidden lg:block">
                오프라인 운동 시 팀원들이 알아볼 수 있게 본인의 사진을 프로필로
                등록해주세요!
              </p>
            </li>
            <li className="flex flex-col">
              <div className="flex">
                <label
                  htmlFor="nickname"
                  className="font-bold text-neutral-70 lg:text-[18px]"
                >
                  닉네임
                </label>
                <p className="flex items-center">
                  <Image
                    src="/assets/sign-up_page/validation_default.svg"
                    alt="디폴트"
                    width={20}
                    height={20}
                  />
                  <span className="text-[11px] lg:text-[13px] text-neutral-50">
                    중복되지 않는 닉네임이어야 합니다.
                  </span>
                </p>
              </div>
              <RegistrationInput
                value={nickname}
                setValue={setNickname}
                placeholder="닉네임을 입력해주세요."
                id="nickname"
              />
            </li>
            <li className="flex flex-col gap-y-4">
              <p className="font-bold text-neutral-70 lg:text-[18px]">성별</p>
              <div className="flex items-center gap-x-3">
                <RoundButton
                  label="남성"
                  onClick={() => handleSelectGender(Gender.Male)}
                  isSelected={gender === Gender.Male}
                  className="text-neutral-50 px-4 py-2"
                />
                <RoundButton
                  label="여성"
                  onClick={() => handleSelectGender(Gender.Female)}
                  isSelected={gender === Gender.Female}
                  className="text-neutral-50 px-4 py-2"
                />
              </div>
            </li>
            <li className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="font-bold text-neutral-70 lg:text-[18px]"
              >
                휴대폰 번호
              </label>
              <PhoneNumberInput setPhoneNumber={setPhoneNumber} />
            </li>
            <li className="flex flex-col">
              <label
                htmlFor="accountNumber"
                className="font-bold text-neutral-70 lg:text-[18px]"
              >
                계좌 정보
              </label>
              <DropDownBoxOfBank
                options={bankName}
                onSelect={handleSelectBankName}
              />
              <RegistrationInput
                value={accountNumber}
                setValue={setAccountNumber}
                placeholder="계좌번호를 입력해주세요."
                id="accountNumber"
              />
            </li>
            <li className="flex flex-col">
              <label
                htmlFor="oneLiner"
                className="font-bold text-neutral-70 lg:text-[18px]"
              >
                자기 소개
              </label>
              <RegistrationInput
                value={oneLiner}
                setValue={setOneLiner}
                placeholder="나를 소개해보세요!"
                id="oneLiner"
              />
            </li>
            <li className="flex justify-center">
              <button
                type="submit"
                className={`w-full px-6 rounded-lg text-white font-semibold h-12 mt-10 mb-10 transition active:translate-y-0 border-2 focus:border-primary-80 outline-none lg:max-w-[350px] lg:mx-auto
                ${
                  !gender ||
                  !nickname ||
                  !phoneNumber ||
                  !accountNumber ||
                  selectedBankName === "은행선택" ||
                  !file
                    ? `bg-neutral-20 text-neutral-40`
                    : `bg-primary-100 hover:-translate-y-1`
                }`}
              >
                등록하기
              </button>
            </li>
          </ul>
        </form>
      </section>
    </Page>
  );
}

export default UserRegistrationPage;
