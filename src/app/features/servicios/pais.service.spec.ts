import { TestBed } from '@angular/core/testing';
import { PaisService } from './pais.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Pais } from '../../core/entidades/pais';
import { environment } from '../../../environments/environment';

describe('PaisService', () => {
  let service: PaisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        PaisService
      ]
    });
    service = TestBed.inject(PaisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Debe retornar una lista de paises', () => {
    const mockPaises: Pais[] = [
      { id: 1, nombre: "Colombia", codigoAlfa2: "COL", codigoAlfa3: "CO", idMoneda: 1 },
      { id: 2, nombre: "Argentina", codigoAlfa2: "ARG", codigoAlfa3: "AR", idMoneda: 2 },
      { id: 3, nombre: "Paraguay", codigoAlfa2: "PAR", codigoAlfa3: "PA", idMoneda: 3 }
    ];
    service.obtenerPaises().subscribe(
      respuesta => {
        expect(respuesta.length).toBe(3);
        expect(respuesta).toEqual(mockPaises);
      }
    );
    const solicitud = httpMock.expectOne(`${environment.urlBase}paises/listar`);
    expect(solicitud.request.method).toBe("GET");
    solicitud.flush(mockPaises);
  });
});
