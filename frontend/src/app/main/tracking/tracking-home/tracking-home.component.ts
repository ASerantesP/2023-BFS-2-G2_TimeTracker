import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Injectable, Injector } from "@angular/core";
import { OComboComponent, OntimizeService } from "ontimize-web-ngx";

enum JornadaEstado {
  iniciar = "iniciar",
  pausar = "pausar",
  reanudar = "reanudar",
  finalizar = "finalizar"
}

@Component({
  selector: "app-tracking-home",
  templateUrl: "./tracking-home.component.html",
  styleUrls: ["./tracking-home.component.scss"],
})
export class TrackingHomeComponent implements OnInit, AfterViewInit {

  JornadaEstado = JornadaEstado; 

  protected jornadaEstado: JornadaEstado = JornadaEstado.iniciar;

  mostrarIniciarJornada: boolean = true;

  jornadaIniciada: boolean = false;

  protected service: OntimizeService;

  @ViewChild('taskCombo', {static: true})taskCombo : OComboComponent;

  constructor(protected injector: Injector) {
    this.service = this.injector.get(OntimizeService);
  }
  
  ngAfterViewInit(): void {
    console.log(this.taskCombo.getValue());
  }
  
  ngOnInit() {
    this.configureService();
    this.getLastOpen();
    console.log(this.taskCombo);
  }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration("timers");
    this.service.configureService(conf);
  }

  startTimer() {
    if (this.service !== null) {
      const values = {T_ID: this.getComboValue()};
      this.service.insert(values, "timer").subscribe(resp => {
        if (resp.code === 0) {
          this.iniciarJornada();
        } else {
          //TODO: Mostrar error
        }
      });
    }
  }


  stopTimer(){
    if (this.service !== null) {
      const values = {};
      const filter = {};
      this.service.update(filter, values, "close").subscribe(resp => {
        if (resp.code === 0) {
        } else {
          //TODO: Mostrar error
        }
      });
      this.finalizarJornada();
    }
  }

  getLastOpen() {
    if (this.service !== null) {
      const filter = {};
      const columns = ['T_ID'];
      this.service.query(filter, columns, 'openTimer').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {
            this.iniciarJornada();
          }
        } else {
          //TODO: Mostrar error
        }
      });
    }
  }
  
  getComboValue() {
    return this.taskCombo.getValue();
  }

  iniciarJornada(): void {
    this.jornadaEstado = JornadaEstado.pausar;
    this.jornadaIniciada = true;
    // this.mostrarIniciarJornada = false;
  }  


  // pausarJornada(): void {
  //   this.jornadaEstado = JornadaEstado.reanudar;
  // }

  // reanudarJornada(): void {
  //   this.jornadaEstado = JornadaEstado.pausar;
  // }

  finalizarJornada(): void {
    this.jornadaEstado = JornadaEstado.iniciar;
    this.jornadaIniciada = false;
    // this.mostrarIniciarJornada = true;
  }
  
}
