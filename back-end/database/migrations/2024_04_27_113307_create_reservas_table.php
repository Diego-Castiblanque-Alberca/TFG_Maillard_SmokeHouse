<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->foreignId('mesa1_id')->constrained('mesas');
            $table->foreignId('mesa2_id')->nullable()->constrained('mesas');
            $table->string('cliente_correo');
            $table->foreign('cliente_correo')->references('correo')->on('clientes');
            $table->date('fecha_reserva');
            $table->primary(['cliente_correo', 'fecha_reserva']);
            $table->foreignId('horario_inicio')->constrained('horarios');
            $table->foreignId('horario_fin')->nullable()->constrained('horarios');
            $table->integer('num_comensales');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
