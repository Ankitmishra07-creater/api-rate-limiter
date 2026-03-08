package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    Map<String, User> users = new HashMap<>();

    int requestCount = 0;
    int LIMIT = 10;

    /*   SIGNUP  */

    @PostMapping("/signup")
    public Map<String,String> signup(@RequestBody User user){

        users.put(user.getEmail(), user);

        Map<String,String> response = new HashMap<>();
        response.put("name", user.getName());

        return response;
    }

    /*  LOGIN  */

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody User user){

        Map<String,String> response = new HashMap<>();

        if(users.containsKey(user.getEmail()) &&
           users.get(user.getEmail()).getPassword().equals(user.getPassword())){

            response.put("name", users.get(user.getEmail()).getName());
            return response;
        }

        response.put("message","Invalid User");
        return response;
    }


    /*  RATE LIMIT REQUEST  */

    @PostMapping("/request")
    public Map<String,Object> request(){

        Map<String,Object> response = new HashMap<>();

        if(requestCount < LIMIT){

            requestCount++;

            response.put("allowed", true);
            response.put("count", requestCount);

        }else{

            response.put("allowed", false);
            response.put("count", requestCount);

        }

        return response;
    }

    
    /*  RESET  */

    @PostMapping("/reset")
    public Map<String,String> reset(){

        requestCount = 0;

        Map<String,String> response = new HashMap<>();
        response.put("message","Reset successful");

        return response;
    }

}