/* eslint-disable react/prop-types */
import { useThree, useFrame } from '@react-three/fiber'
import { button, useControls } from 'leva'
import { useState, useRef } from 'react';
import * as THREE from 'three';

const SaveState = ({ presetSelected, characters, charIndex }) => {
	const { scene } = useThree()
	const timer = useRef(0)

	const findObjectById = (id) => {
		const object = scene.getObjectById(id)
		return object
	}

	const findObjectByCustomId = (id) => {
		let foundObject = null

		scene.traverse((object) => {
			if (object.customId === id) {
				foundObject = object
			}
		})

		if (foundObject) {
			//console.log('Object found', foundObject)
			return foundObject
		} else {
			console.log("Couldn't find Object")
		}

		return null
	}

	const getBonePoses = (root) => {
		const bones = []
		root.traverse((object) => {
			if (object.type === "Bone") {
				bones.push({name: object.name, rotation: object.rotation})
			}
		})
		return bones
	}

	const saveData = () => {
		const poses = []
		characters.forEach( (char, index) => {
			const c = findObjectByCustomId(char.id)
			if (!c) {
				console.log("couldn't find character")
				return
			}
			const pose = getBonePoses(c)
			poses.push(pose)
		})

		const data = {
			presetSelected: presetSelected,
			characters: characters,
			charIndex: charIndex.current,
			poses: poses,
		}
		console.log("SaveData: ", data)

		localStorage.setItem('autosave', JSON.stringify(data))
	}

	const { autoSave } = useControls('Controls', {
		autoSave: {
			label: "Auto Save",
			value: true,
    		},
		"Save": button(() => {
			saveData()
		}),
	}, { collapsed: true }, [characters])

	useFrame((state, delta) => {
		if (!autoSave) return

		timer.current += delta
		if (timer.current > 60) {
			saveData()
			timer.current = 0
		}
	})

	return	
}

export default SaveState
