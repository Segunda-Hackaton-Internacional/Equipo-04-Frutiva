package com.frutiva.backend.servicios.producto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.frutiva.backend.dtos.producto.ProductoDTO;
import com.frutiva.backend.dtos.usuario.UsuarioAuxDTO;
import com.frutiva.backend.modelos.producto.Producto;
import com.frutiva.backend.modelos.usuario.Usuario;
import com.frutiva.backend.repositorios.producto.ProductoRepositorio;
import com.frutiva.backend.repositorios.usuario.UsuarioRepositorio;

import org.modelmapper.ModelMapper;

@Service
public class ProductoServicio {
    private final ModelMapper modelMapper = new ModelMapper();
    private final UsuarioRepositorio usuarioRepo;
    private final ProductoRepositorio repo;


    public ProductoServicio(ProductoRepositorio repo, UsuarioRepositorio usuarioRepo) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
    }

    public List<Producto> listarTodos() {
        return repo.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    public ProductoDTO crear(ProductoDTO p) {
        Long vendedorId = p.getVendedor().getId();
        if (!usuarioRepo.existsById(vendedorId)) {
            throw new IllegalArgumentException("Vendedor con ID " + vendedorId + " no existe");
        }

        Producto producto = convertToEntity(p);
        producto.setVendedor(usuarioRepo.getById(vendedorId)); 

        Producto propiedadnueva = repo.save(producto);
        return convertToDto(propiedadnueva); 
    }

    public Optional<ProductoDTO> actualizar(Long id, ProductoDTO cambios) {
        return repo.findById(id).map(orig -> {
            Long vendedorId = cambios.getVendedor().getId();
            if (!usuarioRepo.existsById(vendedorId)) {
                throw new IllegalArgumentException("Vendedor con ID " + vendedorId + " no existe");
            }
    
            Usuario vendedor = usuarioRepo.getById(vendedorId);
    
            orig.setSku(cambios.getSku());
            orig.setNombre(cambios.getNombre());
            orig.setMarca(cambios.getMarca());
            orig.setModelo(cambios.getModelo());
            orig.setCategoria(cambios.getCategoria());
            orig.setVendedor(vendedor);
            orig.setStock(cambios.getStock());
            orig.setDescripcion(cambios.getDescripcion());
            orig.setPesoNeto(cambios.getPesoNeto());
            orig.setPesoBruto(cambios.getPesoBruto());
            orig.setLargo(cambios.getLargo());
            orig.setAncho(cambios.getAncho());
            orig.setAlto(cambios.getAlto());
            orig.setColor(cambios.getColor());
            orig.setMaterial(cambios.getMaterial());
            orig.setFechaFabricacion(cambios.getFechaFabricacion());
            orig.setFechaCaducidad(cambios.getFechaCaducidad());
            orig.setOrigen(cambios.getOrigen());
            orig.setProveedor(cambios.getProveedor());
            orig.setGarantia(cambios.getGarantia());
            orig.setPrecioUnitario(cambios.getPrecioUnitario());
            orig.setCantidadMinima(cambios.getCantidadMinima());
            orig.setPrecioPorMayor(cambios.getPrecioPorMayor());
            orig.setUnidadesPorPaquete(cambios.getUnidadesPorPaquete());
            orig.setTipoEmpaque(cambios.getTipoEmpaque());
            orig.setNumeroLote(cambios.getNumeroLote());
            orig.setDescuentoPorcentaje(cambios.getDescuentoPorcentaje());
    
            Producto actualizado = repo.save(orig);
            return convertToDto(actualizado);
        });
    }
    
    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    private Producto convertToEntity(ProductoDTO productoDTO) {
        return modelMapper.map(productoDTO, Producto.class);
    }

    private ProductoDTO convertToDto(Producto producto) {
        ProductoDTO dto = modelMapper.map(producto, ProductoDTO.class);
        dto.setVendedor(convertirAUsuarioAuxDTO(producto.getVendedor())); 
        return dto;
    }

    private UsuarioAuxDTO convertirAUsuarioAuxDTO(Usuario usuario) {
        UsuarioAuxDTO usuarioAuxDTO = new UsuarioAuxDTO();
        usuarioAuxDTO.setId(usuario.getId());
        usuarioAuxDTO.setNombre(usuario.getNombre());
        usuarioAuxDTO.setApellido(usuario.getApellido());
        usuarioAuxDTO.setCorreo(usuario.getCorreo());
        usuarioAuxDTO.setEdad(usuario.getEdad());
        return usuarioAuxDTO;
    }

    public List<ProductoDTO> listarTodosDTO() {
        return repo.findAll().stream()
                .map(this::convertToDto)
                .toList();
    }
    
    public Optional<ProductoDTO> obtenerPorIdDTO(Long id) {
        return repo.findById(id).map(this::convertToDto);
    }

    public List<ProductoDTO> filtrar(
        String sku,
        String nombre,
        String marca,
        String modelo,
        String categoria,
        Long stock,
        String descripcion,
        Double pesoNeto,
        Double pesoBruto,
        Double largo,
        Double ancho,
        Double alto,
        String color,
        String material,
        LocalDate fechaFabricacion,
        LocalDate fechaCaducidad,
        String origen,
        String proveedor,
        Integer garantia,
        Double precioUnitario,
        Integer cantidadMinima,
        Double precioPorMayor,
        Integer unidadesPorPaquete,
        String tipoEmpaque,
        String numeroLote,
        Integer descuentoPorcentaje
    ) {
        Specification<Producto> spec = Specification.where(null);

        if (sku != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("sku"), sku));
        if (nombre != null)
            spec = spec.and((r, q, cb) -> cb.like(r.get("nombre"), "%" + nombre + "%"));
        if (marca != null)
            spec = spec.and((r, q, cb) -> cb.like(r.get("marca"), "%" + marca + "%"));
        if (modelo != null)
            spec = spec.and((r, q, cb) -> cb.like(r.get("modelo"), "%" + modelo + "%"));
        if (categoria != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("categoria"), categoria));
        if (stock != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("stock"), stock));
        if (descripcion != null)
            spec = spec.and((r, q, cb) -> cb.like(r.get("descripcion"), "%" + descripcion + "%"));
        if (pesoNeto != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("pesoNeto"), pesoNeto));
        if (pesoBruto != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("pesoBruto"), pesoBruto));
        if (largo != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("largo"), largo));
        if (ancho != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("ancho"), ancho));
        if (alto != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("alto"), alto));
        if (color != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("color"), color));
        if (material != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("material"), material));
        if (fechaFabricacion != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("fechaFabricacion"), fechaFabricacion));
        if (fechaCaducidad != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("fechaCaducidad"), fechaCaducidad));
        if (origen != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("origen"), origen));
        if (proveedor != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("proveedor"), proveedor));
        if (garantia != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("garantia"), garantia));
        if (precioUnitario != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("precioUnitario"), precioUnitario));
        if (cantidadMinima != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("cantidadMinima"), cantidadMinima));
        if (precioPorMayor != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("precioPorMayor"), precioPorMayor));
        if (unidadesPorPaquete != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("unidadesPorPaquete"), unidadesPorPaquete));
        if (tipoEmpaque != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("tipoEmpaque"), tipoEmpaque));
        if (numeroLote != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("numeroLote"), numeroLote));
        if (descuentoPorcentaje != null)
            spec = spec.and((r, q, cb) -> cb.equal(r.get("descuentoPorcentaje"), descuentoPorcentaje));

        return repo.findAll(spec)
                   .stream()
                   .map(p -> modelMapper.map(p, ProductoDTO.class))
                   .collect(Collectors.toList());
    }
    
}
