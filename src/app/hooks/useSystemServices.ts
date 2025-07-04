import { useServicesFindByBusiness } from "@/libs/api/generated/services/services";

interface IUseSystemServices {
  businessId: string;
}

export const useSystemServices = ({ businessId }: IUseSystemServices) => {
  const { data: systemServiceByBusiness } = useServicesFindByBusiness(
    businessId,
    {
      isSystemService: true,
    },
    {
      query: {
        enabled: !!businessId,
      },
    }
  );
  return systemServiceByBusiness;
};
