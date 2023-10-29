"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Photos", {
			id: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
				validate: {
					max: 50,
					notEmpty: true,
				},
				allowNull: false,
			},
			caption: {
				type: Sequelize.STRING,
				validate: {
					max: 255,
					notEmpty: true,
				},
				allowNull: false,
			},
			imageUrl: {
				type: Sequelize.TEXT,
				validate: {
					max: 1024,
					notEmpty: true,
				},
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.addColumn("Photos", "UserId", {
			type: Sequelize.STRING,
		});

		await queryInterface.addConstraint("Photos", {
			fields: ["UserId"],
			type: "foreign key",
			name: "user_id_fk",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Photos");
	},
};

