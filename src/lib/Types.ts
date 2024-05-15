// Context Type
type CommonContextType = {
  headerBg: boolean;
  setHeaderBg: (bg: boolean) => void;
  openPopup: boolean;
  managePopup: (popup: boolean) => void;
  displaySignUpForm: boolean;
  manageFormDisplay: (form: boolean) => void;
};

// Account create modal type
type AccountCreateModalProps = {
  managePopupVisibility: boolean;
  managePopupState: (isOpen: boolean) => void;
};

// Account create modal type
type AccountModalProps = {
  managePopupVisibility: boolean;
  managePopupState: (isOpen: boolean) => void;
  authenticationForm: boolean;
};

// Signup Form model type
type SignUpModelType = {
  name: string;
  email: string;
  password: string;
};

// Login Form model type
type LoginModelType = {
  email: string;
  password: string;
};

type TagType = {
  _id: string;
  name: string;
};

type BlogType = {
  title: string;
  content: string;
  tags: TagType[];
};

type TagsSelectorProps = {
  onTagsChange: (tags: TagType[]) => void;
  clearTagsSignal: boolean;
  setClearTagsSignal: React.Dispatch<React.SetStateAction<boolean>>;
  tagsInitialValue: TagType[];
};

// User context type
type UserContextType = {
  user: any;
  setUser: (userData: any) => void;
};

export type {
  CommonContextType,
  AccountCreateModalProps,
  AccountModalProps,
  SignUpModelType,
  LoginModelType,
  TagType,
  TagsSelectorProps,
  BlogType,
  UserContextType,
};
