package microservice.http.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import microservice.dto.ordenDTO;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrdenByClientResponse {

    private String clientNombre;
    private String clientApellido;
    private Long clientId;
    private List<ordenDTO> ordenDTOList;
}
