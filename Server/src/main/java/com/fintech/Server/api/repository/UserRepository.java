package com.fintech.Server.api.repository;


import com.fintech.Server.api.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findUserEntityByUserEmail(String email); // @Param 어노테이션으로 매개변수 이름 지정

}