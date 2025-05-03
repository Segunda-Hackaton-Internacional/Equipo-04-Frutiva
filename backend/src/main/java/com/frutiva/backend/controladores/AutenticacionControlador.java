package com.frutiva.backend.controladores;

import com.frutiva.backend.dtos.usuario.LoginDTO;
import com.frutiva.backend.dtos.usuario.UsuarioAuxDTO;
import com.frutiva.backend.dtos.usuario.UsuarioDTO;
import com.frutiva.backend.servicios.usuario.UsuarioServicio;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AutenticacionControlador {

    private final UsuarioServicio usuarioServicio;

    public AutenticacionControlador(UsuarioServicio usuarioServicio) {
        this.usuarioServicio = usuarioServicio;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody LoginDTO loginRequest) {

        String email = loginRequest.getCorreo();
        String password = loginRequest.getContrasenia();
        String token = usuarioServicio.login(email, password);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/register")
    public ResponseEntity<UsuarioAuxDTO> crearUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO usuarioCreado = usuarioServicio.save(usuarioDTO);
        return ResponseEntity.ok(usuarioServicio.convertirAUsuarioAuxDTO(usuarioCreado));
    }

 



}
