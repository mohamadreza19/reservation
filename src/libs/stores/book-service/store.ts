import {
  BusinessProfileDto,
  PublicBusinessDto,
  ServiceDto,
  TimeslotByDateDto,
} from "@/libs/api/generated/models";

interface BookServiceStore {
  service: ServiceDto;
  timeslot: TimeslotByDateDto;
  business: PublicBusinessDto;
}

class BookServiceRepository {
  key = "bookServiceStore";
  constructor(private localStorage: Storage) {
    let bookServiceStore: BookServiceStore = this.getInitialStore();

    if (this.isBusinessValid()) {
      bookServiceStore.business = this.getBusiness();
    }
    if (this.isServiceValid()) {
      bookServiceStore.service = this.getService();
    }
    if (this.isTimeslotValid()) {
      bookServiceStore.timeslot = this.getTimeslot();
    }

    this.localStorage.setItem(this.key, JSON.stringify(bookServiceStore));
  }
  getInitialStore(): BookServiceStore {
    return {
      service: {} as ServiceDto,
      timeslot: {} as TimeslotByDateDto,
      business: {} as PublicBusinessDto,
    };
  }
  getBusiness(): PublicBusinessDto {
    const store = this.getStore();
    return store.business;
  }
  getStore(): BookServiceStore {
    const store = this.localStorage.getItem(this.key);
    if (store) {
      return JSON.parse(store);
    }
    return {
      service: {} as ServiceDto,
      timeslot: {} as TimeslotByDateDto,
      business: {} as PublicBusinessDto,
    };
  }
  setService(service: ServiceDto): void {
    const store = this.getStore();
    store.service = service;
    this.localStorage.setItem(this.key, JSON.stringify(store));
  }
  setTimeslot(timeslot: TimeslotByDateDto): void {
    const store = this.getStore();
    store.timeslot = timeslot;
    this.localStorage.setItem(this.key, JSON.stringify(store));
  }
  clearStore(): void {
    this.localStorage.setItem(this.key, JSON.stringify(this.getInitialStore()));
  }
  getService(): ServiceDto {
    return this.getStore().service;
  }
  getTimeslot(): TimeslotByDateDto {
    return this.getStore().timeslot;
  }
  setBusiness(business: PublicBusinessDto): void {
    const store = this.getStore();
    store.business = business;
    this.localStorage.setItem(this.key, JSON.stringify(store));
  }
  isServiceValid(): boolean {
    const store = this.getStore();
    return !!store.service.id && !!store.service.name;
  }
  isTimeslotValid(): boolean {
    const store = this.getStore();
    return !!store.timeslot.id && !!store.timeslot.startTime;
  }
  isBusinessValid(): boolean {
    const store = this.getStore();
    return !!store.business.id && !!store.business.name;
  }
}

const bookServiceRepository = new BookServiceRepository(window.localStorage);
export default bookServiceRepository;
