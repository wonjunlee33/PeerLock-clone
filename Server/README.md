
```
Server
├─ .gitignore
├─ gradle
│  └─ wrapper
│     ├─ gradle-wrapper.jar
│     └─ gradle-wrapper.properties
├─ gradlew
├─ gradlew.bat
└─ src
   ├─ main
   │  ├─ java
   │  │  └─ com
   │  │     └─ fintech
   │  │        └─ Server
   │  │           ├─ ServerApplication.java
   │  │           ├─ api
   │  │           │  ├─ controller
   │  │           │  │  ├─ ReservationController.java
   │  │           │  │  ├─ StorageController.java
   │  │           │  │  └─ UserController.java
   │  │           │  ├─ dto
   │  │           │  │  ├─ ReservationCreateRequestDto.java
   │  │           │  │  ├─ ReservationImageResponseDto.java
   │  │           │  │  ├─ ReservationListResponseDto.java
   │  │           │  │  ├─ StorageImageResponseDto.java
   │  │           │  │  ├─ StorageListResponseDto.java
   │  │           │  │  ├─ StorageRegisterRequestDto.java
   │  │           │  │  ├─ UserDeleteResponseDto.java
   │  │           │  │  ├─ UserInfoResponseDto.java
   │  │           │  │  ├─ UserLoginRequestDto.java
   │  │           │  │  ├─ UserRegistrationDto.java
   │  │           │  │  └─ UserResponseDto.java
   │  │           │  ├─ entity
   │  │           │  │  ├─ BaseEntity.java
   │  │           │  │  ├─ ReservationEntity.java
   │  │           │  │  ├─ ReservationImageEntity.java
   │  │           │  │  ├─ ReservationStatus.java
   │  │           │  │  ├─ StorageEntity.java
   │  │           │  │  ├─ StorageImageEntity.java
   │  │           │  │  ├─ StorageStatus.java
   │  │           │  │  └─ user
   │  │           │  │     ├─ UserEntity.java
   │  │           │  │     ├─ UserProfileEntity.java
   │  │           │  │     ├─ UserStatus.java
   │  │           │  │     └─ kakao
   │  │           │  ├─ exception
   │  │           │  ├─ repository
   │  │           │  │  ├─ ReservationImageRepository.java
   │  │           │  │  ├─ ReservationRepository.java
   │  │           │  │  ├─ StorageImageRepository.java
   │  │           │  │  ├─ StorageRepository.java
   │  │           │  │  └─ UserRepository.java
   │  │           │  ├─ reservation.json
   │  │           │  ├─ service
   │  │           │  │  ├─ ImageUploadService.java
   │  │           │  │  ├─ ReservationService.java
   │  │           │  │  ├─ ReservationServiceImpl.java
   │  │           │  │  ├─ StorageService.java
   │  │           │  │  ├─ StorageServiceImpl.java
   │  │           │  │  ├─ UserService.java
   │  │           │  │  └─ UserServiceImpl.java
   │  │           │  ├─ storage.json
   │  │           │  └─ user.json
   │  │           ├─ config
   │  │           │  ├─ ClientConfig.java
   │  │           │  ├─ SwaggerConfig.java
   │  │           │  └─ WebConfig.java
   │  │           └─ util
   │  └─ resources
   │     ├─ application-dev.yml
   │     ├─ application-local.yml
   │     ├─ application.yml
   │     ├─ logback-spring.xml
   │     ├─ static
   │     └─ templates
   └─ test
      └─ java
         └─ com
            └─ fintech
               └─ Server
                  └─ ServerApplicationTests.java

```