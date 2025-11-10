// 다크모드 사용한다면
// import { useTheme } from "next-themes";
import { Toaster as Sonner, toast as sonnerToast } from "sonner";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon, XIcon } from "lucide-react";
import { CloseIcon } from "../icons";

const toasterVariants = cva("rounded-sm flex items-center gap-2 ", {
  variants: {
    color: {
      primary: "bg-primary-050 border border-primary text-primary",
      secondary: "bg-secondary-50 border border-secondary text-secondary",
      danger: "bg-danger-50 border border-danger text-danger",
      success: "bg-success-50 border border-success text-success",
      warning: "bg-warning-50 border border-warning text-warning ",
      neutral: "bg-white border border-content-04 text-content-04",
    },
    size: {
      sm: "text-caption1 px-2 py-1",
      md: "text-body3 px-3 py-2",
      lg: "text-body2 px-4 py-3",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

interface ToasterProps extends VariantProps<typeof toasterVariants> {
  className?: string;
  color?: VariantProps<typeof toasterVariants>["color"];
  size?: VariantProps<typeof toasterVariants>["size"];
}

// 토스트 타입별 설정
const toastConfigs = {
  success: {
    color: "success" as const,
    icon: CheckCircleIcon,
  },
  error: {
    color: "danger" as const,
    icon: XCircleIcon,
  },
  warning: {
    color: "warning" as const,
    icon: AlertTriangleIcon,
  },
  info: {
    color: "primary" as const,
    icon: InfoIcon,
  },
  normal: {
    color: "neutral" as const,
    icon: InfoIcon,
  },
} as const;

// 공통 토스트 렌더링 함수
const renderToast = (message: string, type: keyof typeof toastConfigs, config?: ToasterProps) => {
  const { color, icon: Icon } = toastConfigs[type];
  const { className } = config || {};

  return sonnerToast.custom(id => (
    <div className={clsx(toasterVariants({ color, size: config?.size || "md" }), className)}>
      <div>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p>{message}</p>
      </div>
      <div onClick={() => sonnerToast.dismiss(id)}>
        <CloseIcon color={color} />
      </div>
    </div>
  ));
};

// 커스텀 토스트 함수들
const toast = {
  success: (message: string, config?: ToasterProps) => renderToast(message, "success", config),
  error: (message: string, config?: ToasterProps) => renderToast(message, "error", config),
  warning: (message: string, config?: ToasterProps) => renderToast(message, "warning", config),
  info: (message: string, config?: ToasterProps) => renderToast(message, "info", config),
  normal: (message: string, config?: ToasterProps) => renderToast(message, "normal", config),
};

// 메인 Toaster 컴포넌트
const Toaster = (props: VariantProps<typeof toasterVariants>) => {
  // const { theme = "system" } = useTheme();

  return (
    <Sonner
      toastOptions={{
        duration: 5000, // 기본 5초
      }}
      theme={"light"}
      richColors={false}
      {...props}
    />
  );
};

export { Toaster, toasterVariants, toast };
