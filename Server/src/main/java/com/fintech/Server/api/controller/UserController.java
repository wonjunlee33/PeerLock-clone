package com.fintech.Server.api.controller;

import com.fintech.Server.api.dto.*;
import com.fintech.Server.api.service.UserService;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @RestController는 @Controller에 @ResponseBody가 추가된 것
 * @Controller와 다르게 REST 형식의 Controller 형태로 지원
 * Rest 형식이란 -> Json 형태로 객체 데이터를 반환하는 것 -> 반환되는 객체는 Json으로 Serialize되어 사용자에게 반환
 * @ResponseBody 어노테이션 생략 가능
 */
//@Controller
@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<UserInfoResponseDto> login(@RequestBody UserLoginRequestDto request) {
        UserInfoResponseDto response = userService.login(request);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody UserRegistrationDto request) {
        UserResponseDto userResponseDto = userService.register(request);
        return ResponseEntity.ok(userResponseDto);
    }


    // todo: 이거 호스트나 유저를 인증할 수 있는 요소를 만들어야 할 것 같은데? 누가 악의적으로 api 요청하면 어떠카징
    // 게스트 -> 호스트로 전환
    @PatchMapping("/guest/{userId}")
    public ResponseEntity<UserResponseDto> switchHost(@PathVariable("userId") Long userId) {
        UserResponseDto userResponseDto = userService.switchStatus(userId);
        return ResponseEntity.ok(userResponseDto);
    }

    // 호스트 -> 게스트로 전환
    @PatchMapping("/host/{userId}")
    public ResponseEntity<UserResponseDto> switchUser(@PathVariable("userId") Long userId) {
        UserResponseDto userResponseDto = userService.switchStatus(userId);
        return ResponseEntity.ok(userResponseDto);
    }

//    @PostMapping("/kakao/callback")
//    public String kakaoCallback(@RequestParam("code") String code) {
//        return "ss";
//    }


    // 유저 정보 가져오기
    // UserInfoResponseDto에 코드 추가 -> UserController -> UserInfoResponseDto -> UserService에서 getUserDetail()
    //  -> UserServiceImpl에서 getUserDetail()을 @override -> UserRepository에서 userDetail()
    @GetMapping("/{userId}")
    public ResponseEntity<UserInfoResponseDto> userDetail(@PathVariable("userId") Long userId) {
        return userService.getUserDetail(userId);
    }


    // 전체 유저 정보 가져오기
    // (UserInfoResponseDto를 list로 사용)
    // UserController -> UserInfoResponseDto -> UserService에서 getAllUsers()
    //  -> UserServiceImpl에서 getAllUsers()를 @override -> UserRepository에서 getAllUserList()
    @GetMapping("")
    public ResponseEntity<List<UserInfoResponseDto>> getAllUserList() {
        List<UserInfoResponseDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // 호스트 계정 지우기
    @PatchMapping("/host/delete/{userId}")
    public ResponseEntity<UserDeleteResponseDto> deleteUser(@PathVariable("userId") Long userId) {
        UserDeleteResponseDto userDeleteResponseDto = userService.deleteUser(userId);
        return ResponseEntity.ok(userDeleteResponseDto);
    }




}
