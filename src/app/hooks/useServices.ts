import { ServiceDto } from "@/libs/api/generated/models";
import { useServicesFindByBusiness } from "@/libs/api/generated/services/services";

interface IUseServices {
  businessId: string;
  systemService: ServiceDto | undefined;
}
export const useServices = ({ businessId, systemService }: IUseServices) => {
  const { data: serviceD } = useServicesFindByBusiness(
    businessId,
    {
      isSystemService: false,
      parentId: systemService?.id,
    },
    {
      query: {
        enabled: !!businessId && !!systemService,
      },
    }
  );
  return serviceD;
};
