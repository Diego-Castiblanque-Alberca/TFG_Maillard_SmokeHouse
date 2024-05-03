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
            $table->id();
            $table->foreignId('mesa1_id')->constrained('mesas');
            $table->foreignId('mesa2_id')->nullable()->constrained('mesas');
            $table->foreignId('cliente_id')->constrained('clientes');
            $table->date('fecha_reserva');
            $table->foreignId('horario_inicio')->constrained('horarios');
            $table->foreignId('horario_fin')->nullable()->constrained('horarios');
            $table->integer('num_comensales');
            $table->timestamps();
            $table->unique(['cliente_id', 'fecha_reserva']);
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
