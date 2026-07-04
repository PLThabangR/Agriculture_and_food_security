//package com.agriTech.Security;
//
//import com.agriTech.Model.User;
//import lombok.Getter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.List;
//
//@Getter
//public class UserDetailsImpl{
//
//    private final Long id;
//    private final String email;
//    private final String password;
//    //private final boolean active;
//    //private final Collection<? extends GrantedAuthority> authorities;
//
//    public  UserDetailsImpl(Long userId, String userEmail, String userPassword){
//        this.id = userId;
//        this.email = userEmail;
//        this.password = userPassword;
//    }
//    public UserDetailsImpl(User user) {
//        this.id = user.getId();
//        this.email = user.getEmail();
//        this.password = user.getPassword();
//        //this.active = user.isActive();
//
//    }
//
//    @Override
//    public String getUsername() {
//        return email;
//    }
//
////    @Override
////    public Collection<? extends GrantedAuthority> getAuthorities() {
////        return List.of();
////    }
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//
//}