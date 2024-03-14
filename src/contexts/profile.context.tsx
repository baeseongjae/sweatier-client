"use client";

import NoUserProfileModal from "@/components/NoUserProfileModal";
import useQueryGetProfile from "@/react-query/queries/useQuery.getProfile";
import { useAuthStore, useModalStore } from "@/store";
import { usePathname } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

export type Profile = {
  id: string;
  gender: "male" | "female";
  phoneNumber: string;
  nickName: string;
  nickNameUpdatedAt?: string;
  oneLiner?: string;
  bankName: string;
  accountNumber: string;
  imgUrl: string;
  createAt: string;
  updatedAt: string;
};

const ProfileContext = createContext<Profile | null>(null);

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }: PropsWithChildren) {
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setUserId = useAuthStore((state) => state.setUserId);
  const pathname = usePathname();
  const openModal = useModalStore((state) => state.open);
  const { data: profile, isFetched: isProfileFetched } = useQueryGetProfile();

  useEffect(() => {
    if (!profile) return;

    setUserId(profile.id);
  }, [profile, setUserId]);

  useEffect(() => {
    if (!isAuthInitialized) return;
    if (!isLoggedIn) return;
    if (pathname === "/accounts/user-registration") return;
    if (!isProfileFetched) return;
    if (profile) return;

    openModal(<NoUserProfileModal />);
  }, [
    profile,
    isAuthInitialized,
    isLoggedIn,
    pathname,
    isProfileFetched,
    openModal,
  ]);

  return (
    <ProfileContext.Provider value={profile || null}>
      {children}
    </ProfileContext.Provider>
  );
}
